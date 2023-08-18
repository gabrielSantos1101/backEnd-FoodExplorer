import bcryptjs from 'bcryptjs'
import knex from '../database/knex/index.js'
import pkg from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'
import { AppError } from '../utils/AppError.js'
const { sign } = pkg

export class SessionsController {
  async create(request, response) {
    const { password, email } = request.body
    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('usuario ou senha incorreta', 401)
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('usuario ou senha incorreta', 401)
    }

    const { secret, expiresIn } = authConfigs.jwt
    const token = sign({ isAdmin: String(user.isAdmin) }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.status(200).json({ user, token })
  }
}
