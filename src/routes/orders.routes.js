import { Router } from 'express'
import { OrdersController } from '../controllers/ordersController.js'
import { verifyUserAuthenticated } from '../middlewares/authMidleware.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

const ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.use(verifyUserAuthenticated)

ordersRoutes.get('/history', ordersController.show)
ordersRoutes.get('/:id', ordersController.index)
ordersRoutes.post('/', adminMiddleware, ordersController.create)
ordersRoutes.put('/:id', adminMiddleware, ordersController.update)
ordersRoutes.delete('/:id', adminMiddleware, ordersController.delete)

export { ordersRoutes }
