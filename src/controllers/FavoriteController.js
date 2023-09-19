/* eslint-disable camelcase */
import pkg from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'
const { decode } = pkg

export class FavoriteController {
  async create(req, res) {
    const { dish_id } = req.params
    const bearer = req.headers.authorization
    const [, token] = bearer.split(' ')

    const { secret } = authConfigs.jwt

    const payload = decode(token, secret)
    const user_id = payload.sub

    const favoriteExists = await knex('favorites')
      .select('id')
      .where({ user_id, dish_id })

    if (favoriteExists.length) {
      throw new AppError('Prato já é favorito', 400)
    }

    await knex('favorites').insert({
      user_id,
      dish_id,
    })

    res.status(200).json({ message: 'Prato adicionado os favoritos' })
  }

  async index(req, res) {
    const user_id = req.user.id

    const dishes = await knex('favorites')
      .where({ user_id })
      .join('dishes', 'favorites.dish_id', '=', 'dishes.id')
      .select('dishes.name', 'dishes.id', 'dishes.image', 'dishes.price')
      .orderBy('name')

    if (!dishes.length) {
      res.status(200).json({ message: 'Não há favoritos' })
    } else {
      res.status(200).json(dishes)
    }
  }

  async delete(req, res) {
    const { dish_id } = req.params

    const deleted = await knex('favorites').where({ dish_id }).del()

    if (!deleted) {
      throw new AppError('Prato favorito não encontrado', 404)
    }

    res.status(200).json()
  }
}
