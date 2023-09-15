import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { adminAutentication } from '../middlewares/adminAutentication.js'
import { verifyUserAuthenticated } from '../middlewares/authAutentication.js'

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.post(
  '/',
  adminAutentication,
  verifyUserAuthenticated,
  dishesController.create,
)
dishesRoutes.put(
  '/:id',
  adminAutentication,
  verifyUserAuthenticated,
  dishesController.update,
)
dishesRoutes.delete(
  '/:id',
  adminAutentication,
  verifyUserAuthenticated,
  dishesController.delete,
)

export { dishesRoutes }
