import { z } from 'zod'
import { createRouter, baseProcedure } from '../trpc'

// websocket
import { EventEmitter } from 'events'
import { observable } from '@trpc/server/observable'
const ee = new EventEmitter()

// models
import { type MpData, Mp } from '../models/Mp'

// router
export const mpsRouter = createRouter({
  getAll: baseProcedure.query(async () => {
    return (await Mp.find()) as MpData[]
  }),
  getOne: baseProcedure.input(z.string()).query(async ({ input: mpId }) => {
    return (await Mp.findOne({
      _id: mpId,
    })) as MpData
  }),
  onUpdate: baseProcedure.subscription(() =>
    observable<MpData[]>((emit) => {
      const onUpdate = async (mps: MpData[]) => {
        emit.next(mps)
      }
      ee.on('change', onUpdate)
      return () => {
        ee.off('add', onUpdate)
      }
    })
  ),
  add: baseProcedure
    .input(
      z.object({
        position: z.tuple([z.number(), z.number()]),
      })
    )
    .mutation(async ({ input: { position } }) => {
      const newMp = new Mp({
        position,
        dateLastSeen: new Date(),
        score: 0,
      })
      await newMp.save()
      ee.emit('change', (await Mp.find()) as MpData[])
      return newMp as MpData
    }),
  score: baseProcedure
    .input(
      z.object({
        mpId: z.string(),
        up: z.boolean(),
        dateSeen: z.date().optional(),
      })
    )
    .mutation(async ({ input: { mpId, up, dateSeen } }) => {
      const updatedMp = (await Mp.findByIdAndUpdate(
        mpId,
        {
          $inc: {
            score: up ? 1 : -1,
          },
          $set: up
            ? {
                dateLastSeen: dateSeen,
              }
            : {},
        },
        {
          new: true,
        }
      )) as MpData
      ee.emit('change', (await Mp.find()) as MpData[])
      return updatedMp
    }),
})
