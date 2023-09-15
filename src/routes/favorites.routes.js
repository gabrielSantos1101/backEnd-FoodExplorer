import { Router } from 'express'

import { FavoriteController } from '../controllers/FavoriteController.js'
import { verifyUserAuthenticated } from '../middlewares/authAutentication.js'

const favoritesRoutes = Router()
const favoritesController = new FavoriteController()

favoritesRoutes.use(verifyUserAuthenticated)

favoritesRoutes.get('/', favoritesController.index)

favoritesRoutes.post('/:dish_id', favoritesController.create)

favoritesRoutes.delete('/:dish_id', favoritesController.delete)

export { favoritesRoutes }
