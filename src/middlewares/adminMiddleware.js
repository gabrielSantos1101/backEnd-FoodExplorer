export function adminMiddleware(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'not today, my friend' })
  }
  next()
}