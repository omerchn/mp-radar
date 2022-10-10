import { createRouter } from '../trpc'
import { mpsRouter } from './mps'

export const appRouter = createRouter({
  mps: mpsRouter,
})

export type AppRouter = typeof appRouter
