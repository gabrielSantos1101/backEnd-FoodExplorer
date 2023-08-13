import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)
userRoutes.put('/:id', userController.update)

export { userRoutes }
