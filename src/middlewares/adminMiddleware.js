import { AppError } from '../utils/AppError.js'

export function adminMiddleware(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Token necessário' })
  }

  try {
    const { isAdmin } = req.user

    req.isAdmin = !!+isAdmin

    if (!req.isAdmin) {
      throw new AppError('Acesso negado')
    }

    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' })
  }
}
