import { decode } from 'jsonwebtoken'

export function adminMiddleware(req, res, next) {
  const jwt = req.headers.authorization.split(' ')[1]
  const decodedJwt = decode(jwt)
  const isAdmin = decodedJwt.claims.is_admin

  if (!isAdmin) {
    res.status(403).json({ error: 'hoje não amigo' })
  }
  next()
}
