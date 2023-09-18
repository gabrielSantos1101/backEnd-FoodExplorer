/* eslint-disable camelcase */
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

export class DishesController {
  async create(req, res) {
    const { name, description, image, price, category, ingredients } = req.body
    const checkDish = await knex('dishes')
      .where('name', name)
      .select('*')
      .first()

    if (checkDish) {
      throw new AppError('Esse prato já foi cadastrado', 409)
    }

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      image,
      price,
      category,
    })

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name,
      }
    })
    await knex('ingredients').insert(insertIngredients)

    return res.status(201).json({ message: 'prato cadastrado com sucesso' })
  }

  async update(req, res) {
    try {
      const { name, description, image, price, category, ingredients } =
        req.body
      const dish_id = req.params.id

      await knex('dishes').where({ id: dish_id }).update({
        name,
        description,
        image,
        price,
        category,
      })

      await knex('ingredients').where({ dish_id }).del()

      const newIngredients = ingredients.map((ingredient) => {
        return {
          dish_id,
          name: ingredient,
        }
      })
      await knex('ingredients').insert(newIngredients)

      return res.status(201).json({ message: 'Prato atualizado com sucesso' })
    } catch (error) {
      AppError('Erro ao atualizar prato:', error)
      return res.status(500).json({ message: 'Erro ao atualizar prato' })
    }
  }

  async show(req, res) {
    const { id } = req.params
    try {
      const dish = await knex.select('*').from('dishes').where('id', id).first()
      const ingredients = await knex('ingredients').where('dish_id', id)
      const dishesWithIngredients = { dish, ingredients }
      return res.status(200).json(dishesWithIngredients)
    } catch (error) {
      AppError('Erro ao buscar pratos:', error)
      return res.status(500).json({ message: 'Erro ao buscar pratos' })
    }
  }

  async index(req, res) {
    const { search } = req.query

    try {
      let dishesQuery = knex('dishes')
        .select([
          'dishes.id',
          'dishes.name',
          'dishes.price',
          'dishes.description',
          'dishes.image',
          'dishes.category',
          'dishes.created_at',
        ])
        .distinct()
        .orderBy('dishes.name')

      if (search) {
        dishesQuery = dishesQuery
          .where('dishes.name', 'like', `%${search}%`)
          .orWhere('ingredients.name', 'like', `%${search}%`)
          .join('ingredients', 'dishes.id', '=', 'ingredients.dish_id')
      }

      const dishes = await dishesQuery

      return res.status(200).json(dishes)
    } catch (error) {
      AppError('Erro ao buscar pratos:', error)
      return res.status(500).json({ message: 'Erro ao buscar pratos' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      await knex('dishes').where({ id }).delete()

      return res.status(202).json({ message: 'Prato excluído com sucesso' })
    } catch (error) {
      AppError('Erro ao excluir prato:', error)
      return res.status(500).json({ message: 'Erro ao excluir prato' })
    }
  }
}
