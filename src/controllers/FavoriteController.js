/* eslint-disable camelcase */
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

export class FavoriteController {
  async create(req, res) {
    const user_id = req.user.id
    const { dish_id } = req.params

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
      .select('dishes.name', 'dishes.image', 'dishes.price')
      .orderBy('name')

    if (!dishes.length) {
      throw new AppError('Não há favoritos', 404)
    }

    res.status(200).json(dishes)
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
