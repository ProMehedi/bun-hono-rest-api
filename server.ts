import { Hono } from 'hono'
import { logger } from 'hono/logger'
import connectDB from './config/db'
import { users } from './routes'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

// Initialize the Hono app
const app = new Hono().basePath('/api/v1')

// Config MongoDB
connectDB()

// Initialize middlewares
app.use('*', logger(), prettyJSON())

// Cors
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

app.get('/', (c) => c.text('Hono!'))

// User Routes
app.route('/users', users)

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
