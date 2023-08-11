export class UserController {
  async create(req, res) {
    const { name, email, password } = req.body
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