import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js'
import { verifyUserAuthenticated } from '../middlewares/authMidleware.js'

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.post(
  '/',
  adminMiddleware,
  verifyUserAuthenticated,
  dishesController.create,
)
dishesRoutes.put(
  '/:id',
  adminMiddleware,
  verifyUserAuthenticated,
  dishesController.update,
)
dishesRoutes.delete(
  '/:id',
  adminMiddleware,
  verifyUserAuthenticated,
  dishesController.delete,
)

export { dishesRoutes }
