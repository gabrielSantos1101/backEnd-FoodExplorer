import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'

const userRoutes = Router()
const dishesController = new DishesController()

userRoutes.post('/', dishesController.create)
userRoutes.put('/', dishesController.update)

export { userRoutes }
