import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js'
import { verifyUserAuthenticated } from '../middlewares/authMidleware.js'

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.use(verifyUserAuthenticated)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.post('/', adminMiddleware, dishesController.create)
dishesRoutes.put('/:id', adminMiddleware, dishesController.update)
dishesRoutes.delete('/:id', adminMiddleware, dishesController.delete)

export { dishesRoutes }
