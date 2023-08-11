import { Router } from 'express'
import { userRoutes } from './users.routes.js'
import { sessionRoutes } from './sessions.router.js'
// import { DishesRouter } from './sessions.routes.js'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/session', sessionRoutes)
// routes.use('/dishes', DishesRouter)

export { routes }