import { Router } from 'express'
import { SessionsController } from '../controllers/sessionsController.js'

const sessionRoutes = Router()
const sessionsController = new SessionsController()

sessionRoutes.post('/', sessionsController.create)
sessionRoutes.put('/', sessionsController.update)

export { sessionRoutes }
