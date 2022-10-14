import React, { useState } from 'react'
import { inferProcedureOutput } from '@trpc/server'
import { createWSClient, wsLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import superjson from 'superjson'

// trpc router types
import { type AppRouter } from '../../../server/src/routers/_app'
export type MpData = NonNullable<
  inferProcedureOutput<AppRouter['mps']['getOne']>
>

// websocket client
const wsClient = createWSClient({
  url: import.meta.env.DEV
    ? 'ws://localhost:3000'
    : 'ws://knwjac7v4q.eu-west-1.awsapprunner.com',
})

// trpc initialization
export const trpc = createTRPCReact<AppRouter>()

// provider
export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: wsClient,
        }),
      ],
      transformer: superjson,
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

// hooks
export function useMps() {
  const utils = trpc.useContext()

  const mpsQuery = trpc.mps.getAll.useQuery(undefined, {
    staleTime: Infinity,
  })

  trpc.mps.onUpdate.useSubscription(undefined, {
    onData: (data) => {
      utils.mps.getAll.setData(data)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  return mpsQuery
}

export function useAddMp() {
  return trpc.mps.add.useMutation({
    onError: (err) => {
      console.log(err)
    },
  })
}

export function useMpScore() {
  return trpc.mps.score.useMutation()
}
