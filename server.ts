import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
//
import connectDB from './config/db'
import { Users } from './routes'

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

// JWT
if (Bun.env.JWT_SECRET !== undefined) {
  // app.use('*', jwt({ secret: Bun.env.JWT_SECRET, alg: 'HS256' }))
}

// User Routes
app.route('/users', Users)

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

// app.onError((err, c) => {
//   console.error(`${err}`)
//   return c.text('Custom Error Message', 500)
// })

const port = Bun.env.PORT || 8000

export default {
  port,
  fetch: app.fetch,
}
