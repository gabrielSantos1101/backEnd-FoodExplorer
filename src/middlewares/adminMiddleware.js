export function adminMiddleware(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(403).json({ error: 'hoje não amigo' })
  }
  next()
}
