import { Context, Next } from 'hono'
import { Jwt } from 'hono/utils/jwt'
//
import { User } from '../models'

export const protect = async (c: Context, next: Next) => {
  let token

  if (
    c.req.header('Authorization') &&
    c.req.header('Authorization')?.startsWith('Bearer')
  ) {
    try {
      token = c.req.header('Authorization')?.replace(/Bearer\s+/i, '')
      if (!token) {
        return c.json({ message: 'Not authorized to access this route' })
      }

      const { id } = await Jwt.verify(token, 'abc123')
      const user = await User.findById(id).select('-password')
      c.set('user', user)

      await next()
    } catch (err) {
      throw new Error('Invalid token! You are not authorized!')
    }
  }

  if (!token) {
    throw new Error('Not authorized! No token found!')
  }
}
