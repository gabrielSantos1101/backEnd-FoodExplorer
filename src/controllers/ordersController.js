/* eslint-disable camelcase */
import knex from '../database/knex/index.js'

export class OrdersController {
  async create(req, res) {
    try {
      const { dishes, amount } = req.body
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

      const orderedDishes = await knex('dishes')
        .whereIn('id', dishes)
        .select('id', 'name', 'price')

      const order = {
        user_id,
        user_address: userAddress.address,
        dishes: orderedDishes,
        amount,
      }

      return res.status(201).json({ order })
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      return res.status(500).json({ message: 'Erro ao criar pedido' })
    }
  }

  async update(req, res) {
    // const { user_id, new_status, created_at } = req.body
    // return res.status(200).json({})
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
