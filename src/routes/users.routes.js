import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'
import { verifyUserAuthenticated } from '../middlewares/authAutentication.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)
userRoutes.put('/:id', verifyUserAuthenticated, userController.update)

export { userRoutes }
