import { Context, ErrorHandler, Next } from 'hono'

export const errorHandler = (c: Context) => {
  const statusCode = c.res.status

  c.status(statusCode)

  return c.json({
    message: c.error?.message,
    stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
  })
}
