import { Router } from 'express'
import { OrdersController } from '../controllers/ordersController.js'
import { verifyUserAuthenticated } from '../middlewares/authMidleware.js'

const ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.use(verifyUserAuthenticated)

ordersRoutes.get('/history', ordersController.show)
ordersRoutes.get('/:id', ordersController.index)
ordersRoutes.post('/', ordersController.create)
ordersRoutes.put('/:id', ordersController.update)
ordersRoutes.delete('/:id', ordersController.delete)

export { ordersRoutes }
