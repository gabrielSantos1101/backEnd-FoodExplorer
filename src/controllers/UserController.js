/* eslint-disable camelcase */
import bcryptjs from 'bcryptjs'
import pkg from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'
const { decode } = pkg

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
    const { name, email, password, avatar, address } = req.body
    const bearer = req.headers.authorization
    const [, token] = bearer.split(' ')
    const jsonAdress = JSON.stringify(address)

    const { secret } = authConfigs.jwt
    const payload = decode(token, secret)
    const user_id = payload.sub

    const user = await knex('users').where('id', user_id).select('*').first()

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (email) {
      const userWithUpdateEmail = await knex('users')
        .where('email', email)
        .select('email', 'id')
        .first()

      if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
        throw new AppError('Esse email já foi cadastrado', 409)
      }
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.avatar = avatar ?? user.avatar
    user.address = jsonAdress ?? user.address

    if (password) {
      const checkPassword = await bcryptjs.compare(password, user.password)

      if (!checkPassword) {
        throw new AppError('As senha inconpatíveis', 400)
      }
    }

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        updated_at: knex.raw('CURRENT_TIMESTAMP'),
      })
      .where('id', user_id)

    return res.json()
  }

  async index(req, res) {
    const bearer = req.headers.authorization
    const [, token] = bearer.split(' ')

    const { secret } = authConfigs.jwt
    try {
      const payload = decode(token, secret)
      const id = payload.sub

      const user = await knex('users')
        .where('id', id)
        .select('name', 'email', 'avatar', 'address')
        .first()

      return res.json(user)
    } catch (err) {
      console.log(err)
      throw new AppError('Token inválido', 401)
    }
  }
}
