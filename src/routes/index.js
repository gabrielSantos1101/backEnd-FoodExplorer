import { Router } from 'express'
import { userRoutes } from './users.routes.js'
import { sessionRoutes } from './sessions.router.js'
import { dishesRoutes } from './dishes.routes.js'
import { ordersRoutes } from './orders.routes.js'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/session', sessionRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/orders', ordersRoutes)

export { routes }
