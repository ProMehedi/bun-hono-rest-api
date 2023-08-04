import { Hono } from 'hono'
import { user } from '../controllers'
import { auth } from '../middlewares'

const users = new Hono()

// Get All Users
users.get('/', auth.protect, (c) => user.getUsers(c))

// Get Single User
users.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ message: `User ${id}` })
})

// Get User Profile
users.get('/profile', (c) => {
  return c.json({ message: 'User Profile' })
})

export default users
