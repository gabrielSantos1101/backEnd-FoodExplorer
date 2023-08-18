/* eslint-disable camelcase */
import knex from '../database/knex/index.js'

export class OrdersController {
  async create(req, res) {
    try {
      const { dishes } = req.body
      const user_id = req.user.id

      const userAddress = await knex('users')
        .where('id', user_id)
        .select('address')
        .first()

      if (!userAddress) {
        return res
          .status(404)
          .json({ message: 'Endereço do usuário não encontrado' })
      }

      const dishIds = dishes.map((dish) => dish.dish_id)

      const orderedDishes = await knex('dishes')
        .whereIn('id', dishIds)
        .select('id', 'name', 'price')

      const orderedDishesWithAmount = orderedDishes.map((dish) => {
        const orderedDish = dishes.find((item) => item.dish_id === dish.id)
        return {
          ...dish,
          amount: orderedDish.amount,
        }
      })

      const order = {
        user_id,
        user_address: userAddress.address,
        dishes: orderedDishesWithAmount,
      }

      const jsonOrder = JSON.stringify(order)
      const Id = await knex('orders').insert({
        user_id,
        dishes_order: jsonOrder,
        status: 'Pendente',
      })

      return res.status(201).json({ order: { id: Id, ...order } })
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      return res.status(500).json({ message: 'Erro ao criar pedido' })
    }
  }

  async update(req, res) {
    const { user_id, new_status } = req.body

    const now = await knex.raw('SELECT NOW()')

    await knex('orders').where({ id: user_id }).update({
      status: new_status,
      updated_at: now,
    })

    return res.status(200).json({})
  }

  async show(req, res) {
    // const user_id = req.user.id
    // const { keyword } = req.query
    // return res.status(200).json(dish)
  }

  async index(req, res) {
    // const { keyword } = req.query
    // return res.status(200).json(dishes)
  }

  async delete(req, res) {
    // const { id } = req.params
    // const { user_id, created_at } = req.body

    return res.status(202).json({})
  }
}
