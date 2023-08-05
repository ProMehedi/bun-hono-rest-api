import { Context } from 'hono'
import { User } from '../models'
import { genToken } from '../utils'

/**
 * @api {get} /users Get All Users
 * @apiGroup Users
 * @access Private
 */
export const getUsers = async (c: Context) => {
  const users = await User.find()

  return c.json({ users })
}

/**
 * @api {post} /users Create User
 * @apiGroup Users
 * @access Public
 */
export const createUser = async (c: Context) => {
  const { name, email, password } = await c.req.json()

  // Check for existing user
  const userExists = await User.findOne({ email })
  if (userExists) {
    c.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (!user) {
    c.status(400)
    throw new Error('Invalid user data')
  }

  const token = await genToken(user._id.toString())

  return c.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token,
    message: 'User created successfully',
  })
}

/**
 * @api {post} /users/login Login User
 * @apiGroup Users
 * @access Public
 */
export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json()

  // Check for existing user
  if (!email || !password) {
    c.status(400)
    throw new Error('Please provide an email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    c.status(401)
    throw new Error('No user found with this email')
  }

  if (!(await user.mathPassword(password))) {
    c.status(401)
    throw new Error('Invalid credentials')
  } else {
    const token = await genToken(user._id.toString())

    return c.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
      message: 'User logged in successfully',
    })
  }
}
