import { Hono } from 'hono'
import { logger } from 'hono/logger'
import connectDB from './config/db'

// Initialize the Hono app
const app = new Hono().basePath('/api/v1')

// Config MongoDB\
connectDB()
// app.use(connectDB)

// Initialize the logger middleware
app.use('*', logger())

app.get('/', (c) => c.text('Hono!'))

app.get('/json', (c) => {
  if (c.runtime === 'bun') {
    return c.json({ message: 'You are using Bun!' })
  }

  return c.json({
    message: 'Hello, World!',
  })
})

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default {
  port: 8000,
  fetch: app.fetch,
}
