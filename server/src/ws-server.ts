import { applyWSSHandler } from '@trpc/server/adapters/ws'
import ws from 'ws'
import { appRouter } from './routers/_app'

const port = Number(process.env.PORT) || 3000

const wss = new ws.Server({
  port,
})

const handler = applyWSSHandler({ wss, router: appRouter })
wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})
console.log(`✅ WebSocket Server listening on port ${port}`)

process.on('SIGTERM', () => {
  console.log('SIGTERM')
  handler.broadcastReconnectNotification()
  wss.close()
})
