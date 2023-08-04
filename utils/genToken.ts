import { Jwt } from 'hono/utils/jwt'

const genToken = (id: string) => {
  return Jwt.sign({ id }, Bun.env.JWT_SECRET || '')
}

export default genToken
