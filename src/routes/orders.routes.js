import { Router } from 'express'
import { OrdersController } from '../controllers/ordersController.js'
import { adminAutentication } from '../middlewares/adminAutentication.js'
import { verifyUserAuthenticated } from '../middlewares/authAutentication.js'

const ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.use(verifyUserAuthenticated)

ordersRoutes.get('/history', ordersController.show)
ordersRoutes.get('/:id', ordersController.index)
ordersRoutes.post('/', adminAutentication, ordersController.create)
ordersRoutes.put('/:id', adminAutentication, ordersController.update)
ordersRoutes.delete('/:id', adminAutentication, ordersController.delete)

export { ordersRoutes }
