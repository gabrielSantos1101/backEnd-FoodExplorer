import bcryptjs from 'bcryptjs'
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'
import jwt from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'

export class SessionsController {
  async create(request, response) {
    const { sign } = jwt
    const { password, email } = request.body
    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('User not found', 401)
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('User not found', 401)
    }

    const isAdmin = user.profile_id === 1

    const { secret, expiresIn } = authConfigs.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.status(200).json({ user, token })
  }
}
