import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'
import { verifyUserAuthenticated } from '../middlewares/authAutentication.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)
userRoutes.put('/', verifyUserAuthenticated, userController.update)
userRoutes.get('/', verifyUserAuthenticated, userController.index)

export { userRoutes }
