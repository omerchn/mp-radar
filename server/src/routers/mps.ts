import { z } from 'zod'
import { createRouter, baseProcedure } from '../trpc'

// websocket
import { EventEmitter } from 'events'
import { observable } from '@trpc/server/observable'
const ee = new EventEmitter()

// types
import { MpData } from '../placeholder/interfaces'

// data
import { mps } from '../placeholder/data'

// router
export const mpsRouter = createRouter({
  getAll: baseProcedure.query(() => {
    return mps
  }),
  getOne: baseProcedure.input(z.string()).query(({ input: mpId }) => {
    return mps.find((mp) => mp.id === mpId)
  }),
  onUpdate: baseProcedure.subscription(() =>
    observable<MpData[]>((emit) => {
      const onUpdate = (mps: MpData[]) => {
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
        dateSeen: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const mp = {
        id: Date.now().toString(),
        position: input.position,
        dateLastSeen: input.dateSeen,
        score: 1,
      }
      mps.push(mp)
      ee.emit('change', mps)
      return mps
    }),
  score: baseProcedure
    .input(
      z.object({
        mpId: z.string(),
        score: z.number(),
      })
    )
    .mutation(({ input: { mpId, score } }) => {
      const mp = mps.find((mp) => mp.id === mpId)
      if (mp) {
        mp.score += score
      }
      ee.emit('change', mps)
      return mps
    }),
})
