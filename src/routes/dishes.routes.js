import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.post('/', dishesController.create)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.delete('/:id', dishesController.delete)

export { dishesRoutes }
