import { Context } from 'hono'

// Error Handler
export const errorHandler = (c: Context) => {
  const statusCode = c.res.status
  c.status(statusCode)

  return c.json({
    success: false,
    statusCode,
    message: c.error?.message,
    stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
  })
}

// Not Found Handler
export const notFound = (c: Context) => {
  const statusCode = c.res.status
  c.status(statusCode)

  return c.json({
    success: false,
    statusCode,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  })
}
