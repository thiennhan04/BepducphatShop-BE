import jwt from 'jsonwebtoken'

export const signAuthToken = (payload) => {
  const secret = process.env.AUTH_SECRET
  const expiresIn = process.env.AUTH_EXPIRATION
  return jwt.sign(payload, secret, { expiresIn })
}

export const verifyAuthToken = (token) => {
  const secret = process.env.AUTH_SECRET
  return jwt.verify(token, secret)
}
