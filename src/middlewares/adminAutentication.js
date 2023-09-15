import pkg from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'
const { decode } = pkg

export function adminAutentication(req, res, next) {
  const bearer = req.headers.authorization
  const [type, token] = bearer.split(' ')

  const { secret } = authConfigs.jwt

  if (!token) {
    return res.status(401).json({ message: 'Token necessário' })
  }

  try {
    const payload = decode(token, secret)

    payload.isAdmin = !!+payload.isAdmin

    if (!payload.isAdmin) {
      return res.status(403).json('Acesso negado')
    }

    next()
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'Token inválido' })
  }
}
