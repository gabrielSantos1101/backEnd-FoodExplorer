/* eslint-disable camelcase */
import pkg from 'jsonwebtoken'
import authConfigs from '../configs/auth.js'
import knex from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'
const { decode } = pkg

export class OrdersController {
  async create(req, res) {
    try {
      const { dishes } = req.body
      const bearer = req.headers.authorization

      const [, token] = bearer.split(' ')
      const { secret } = authConfigs.jwt

      const payload = decode(token, secret)
      const user_id = payload.sub

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
      AppError('Erro ao criar pedido:', error)
      return res.status(500).json({ message: 'Erro ao criar pedido' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { status } = req.body

      await knex('orders').where('id', id).update({ status })

      return res
        .status(200)
        .json({ message: 'Status do pedido atualizado com sucesso' })
    } catch (error) {
      AppError('Erro ao atualizar o status do pedido:', error)
      return res
        .status(500)
        .json({ message: 'Erro ao atualizar o status do pedido' })
    }
  }

  async show(req, res) {
    const bearer = req.headers.authorization

    const [, token] = bearer.split(' ')
    const { secret } = authConfigs.jwt

    const payload = decode(token, secret)
    const user_id = payload.sub

    try {
      const orders = await knex('orders').where({ user_id }).select('*')

      return res.status(200).json({ orders })
    } catch (error) {
      AppError('Erro ao buscar as ordens:', error)
      return res.status(500).json({ message: 'Erro ao buscar as ordens' })
    }
  }

  async index(req, res) {
    try {
      const { keyword } = req.query

      let query = knex('orders')

      if (keyword) {
        query = query
          .where('user_address', 'like', `%${keyword}%`)
          .orWhere('status', 'like', `%${keyword}%`)
      }

      const orders = await query.select('*')

      return res.status(200).json({ orders })
    } catch (error) {
      AppError('Erro ao buscar as ordens:', error)
      return res.status(500).json({ message: 'Erro ao buscar as ordens' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const bearer = req.headers.authorization

      const [, token] = bearer.split(' ')
      const { secret } = authConfigs.jwt

      const payload = decode(token, secret)
      const user_id = payload.sub

      const order = await knex('orders').where({ id, user_id }).first()

      if (!order) {
        return res
          .status(404)
          .json({ message: 'Ordem não encontrada ou não pertence ao usuário' })
      }

      await knex('orders').where('id', id).del()

      return res.status(202).json({ message: 'Ordem excluída com sucesso' })
    } catch (error) {
      AppError('Erro ao excluir a ordem:', error)
      return res.status(500).json({ message: 'Erro ao excluir a ordem' })
    }
  }
}
