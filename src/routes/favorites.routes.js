import { Router } from 'express'

import { verifyUserAuthenticated } from '../middlewares/authMidleware.js'
import { FavoriteController } from '../controllers/FavoriteController.js'

const favoritesRoutes = Router()
const favoritesController = new FavoriteController()

favoritesRoutes.use(verifyUserAuthenticated)

favoritesRoutes.get('/', favoritesController.index)

favoritesRoutes.post('/:dish_id', favoritesController.create)

favoritesRoutes.delete('/:dish_id', favoritesController.delete)

export { favoritesRoutes }
