import { Context, Hono } from 'hono'

const users = new Hono()

// Get All Users
users.get('/', (c) => {
  return c.json({ message: 'Users' })
})

// Get Single User
users.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ message: `User ${id}` })
})

export default users
