export class UserController {
  async create(req, res) {
    const { name, email, password } = req.body

if (!name || !email || !password) {
  throw new Error('Name, email and password are required')
}

    res.json({
      name,
      email,
      password
    })
  }
  async update(req, res) {
    const { name, email, password } = req.body
  }
}