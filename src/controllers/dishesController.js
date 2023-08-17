/* eslint-disable camelcase */
import { AppError } from '../utils/AppError.js'
import { dbConnect } from '../database/sqlite/index.js'
import knex from '../database/knex/index.js'

export class DishesController {
  async create(req, res) {
    const { name, description, image, price, category, ingredients } = req.body
    const database = await dbConnect()
    const checkDish = await database.get(
      'SELECT * FROM dishes WHERE name = (?)',
      [name],
    )

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
      console.error('Erro ao atualizar prato:', error)
      return res.status(500).json({ message: 'Erro ao atualizar prato' })
    }
  }

  async show(req, res) {
    try {
      const dishes = await knex.select('*').from('dishes')
      const dishesWithIngredients = await Promise.all(
        dishes.map(async (dish) => {
          const ingredients = await knex('ingredients')
            .where('dish_id', dish.id)
            .orderBy('name')

          return { ...dish, ingredients }
        }),
      )

      return res.status(200).json(dishesWithIngredients)
    } catch (error) {
      console.error('Erro ao buscar pratos:', error)
      return res.status(500).json({ message: 'Erro ao buscar pratos' })
    }
  }

  async index(req, res) {
    try {
      const dish_id = req.params.id
      const dish = await knex('dishes').where('id', dish_id).first()

      if (!dish) {
        throw new AppError('Prato não encontrado', 404)
      }

      const ingredients = await knex('ingredients')
        .where('dish_id', dish_id)
        .orderBy('name')

      const dishWithIngredients = {
        dish,
        ingredients,
      }

      return res.status(200).json(dishWithIngredients)
    } catch (error) {
      console.error('Erro ao buscar prato:', error)
      return res.status(500).json({ message: 'Erro ao buscar prato' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      await knex('dishes').where({ id }).delete()

      return res.status(202).json({ message: 'Prato excluído com sucesso' })
    } catch (error) {
      console.error('Erro ao excluir prato:', error)
      return res.status(500).json({ message: 'Erro ao excluir prato' })
    }
  }
}
