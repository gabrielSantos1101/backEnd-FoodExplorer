import { compare } from 'bcryptjs'
import { AppError } from '../utils/AppError'
import { sign } from 'jsonwebtoken'
import { authConfig } from '../configs/auth.js'

export class SessionsCreateService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository
  }

  async execute({ email, password }) {
    const user = await this.sessionsRepository.getUserByEmail(email)

    if (!user) {
      throw new AppError('E-mail or password invalid.', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail or password invalid.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign(
      {
        isAdmin: String(user.is_admin),
      },
      secret,
      {
        subject: String(user.id),
        expiresIn,
      },
    )

    return {
      user: {
        name: user.name,
      },
      token,
    }
  }
}
