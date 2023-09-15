import pkg from 'jsonwebtoken'
import jwtConfigAuth from '../configs/auth.js'
import { AppError } from '../utils/AppError.js'
const { verify } = pkg

function verifyUserAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token invalid', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub, isAdmin } = verify(token, jwtConfigAuth.jwt.secret)
    if (sub) {
      req.user = {
        id: sub,
        isAdmin,
      }
    }

    return next()
  } catch {
    throw new AppError('JWT invalid', 401)
  }
}

export { verifyUserAuthenticated }
