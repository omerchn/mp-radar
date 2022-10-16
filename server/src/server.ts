// Environment Variables
import dotenv from 'dotenv'
dotenv.config()
import assert from 'assert'
assert(process.env.MONGO_URI, 'environment variable: MONGO_URI is missing')

// Web Socket Server
import ws from 'ws'
const port = Number(process.env.PORT) || 3000
const wss = new ws.Server({
  port,
})
import { appRouter } from './routers/_app'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
const handler = applyWSSHandler({ wss, router: appRouter })
wss.on('connection', (ws) => {
  console.log(`➕ Connection (${wss.clients.size})`)
  ws.once('close', () => {
    console.log(`➖ Connection (${wss.clients.size})`)
  })
})
console.log(`✅ WebSocket Server listening on port ${port}`)
process.on('SIGTERM', () => {
  console.log('SIGTERM')
  handler.broadcastReconnectNotification()
  wss.close()
})

// MongoDB Mongoose Initialization
import mongoose from 'mongoose'
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to DB')
  })
  .catch((err) => {
    console.log('🔴', err)
  })

// Cron Job to clean-up Mps
import { cleanMps } from './utils/cleanMps'
cleanMps()
setInterval(cleanMps, 1000 * 60 * 5) // every 5 minutes.
