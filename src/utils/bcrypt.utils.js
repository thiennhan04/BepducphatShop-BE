import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
  const secret = process.env.PASSWORD_SECRET || ''
  const combinedPassword = password + secret
  return await bcrypt.hash(combinedPassword, saltRounds)
}

export const verifyPassword = async (password, hashedPassword) => {
  const secret = process.env.PASSWORD_SECRET || ''
  const combinedPassword = password + secret
  return await bcrypt.compare(combinedPassword, hashedPassword)
}
