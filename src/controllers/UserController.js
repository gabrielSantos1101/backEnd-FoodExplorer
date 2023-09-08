/* eslint-disable camelcase */
import bcryptjs from 'bcryptjs'
import { AppError } from '../utils/AppError.js'
import knex from '../database/knex/index.js'

export class UserController {
  async create(req, res) {
    const { name, email, password } = req.body
    const checkUser = await knex('users')
      .where('email', email)
      .select('*')
      .first()

    if (checkUser) {
      throw new AppError('Esse email já foi cadastrado', 409)
    }

    const hashedPassword = await bcryptjs.hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    })

    res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password, avatar, address } = req.body

    const user_id = req.params.id

    const user = await knex('users').where('id', user_id).select('*').first()

    if (!user) {
      throw new Error('User not found', 404)
    }

    const userWithUpdateEmail = await knex('users')
      .where('email', email)
      .select('*')
      .first()

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new Error('Esse email já foi cadastrado', 409)
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

    if ((password && address) || (password && avatar)) {
      const checkOldPassword = await bcryptjs.compare(password, user.password)
      if (!checkOldPassword) {
        throw new Error('password error', 401)
      }
    }

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        address: user.address,
        updated_at: knex.raw('CURRENT_TIMESTAMP'),
      })
      .where('id', user_id)

    return res.json()
  }
}
