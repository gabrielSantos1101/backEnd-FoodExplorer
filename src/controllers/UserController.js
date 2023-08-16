/* eslint-disable camelcase */
import bcryptjs from 'bcryptjs'
import { dbConnect } from '../database/sqlite/index.js'

export class UserController {
  async create(req, res) {
    const { name, email, password } = req.body
    const database = await dbConnect()
    const checkUser = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    )

    if (checkUser) {
      throw new Error('This email is already registered', 409)
    }

    const hashedPassword = await bcryptjs.hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, false],
    )

    res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password, avatar, address } = req.body

    const user_id = req.user.id

    const database = await dbConnect()

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id,
    ])

    if (!user) {
      throw new Error('User not found', 404)
    }

    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    )

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new Error('This email is already registered', 409)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.avatar = avatar ?? user.avatar
    user.address = address ?? user.address

    if (password && old_password) {
      const checkOldPassword = await bcryptjs.compare(
        old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new Error('Old password is required', 400)
      }

      user.password = await bcryptjs.hash(password, 8)
    }

    await database.run(
      `UPDATE users SET 
    name = (?), 
    email = (?), 
    password = (?),
    avatar = (?),
    address = (?),
    updated_at = DATETIME('now') 
    WHERE id = (?)`,
      [
        user.name,
        user.email,
        user.password,
        user.avatar,
        user.address,
        user_id,
      ],
    )

    return res.json()
  }
}
