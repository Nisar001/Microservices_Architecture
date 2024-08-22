import express from 'express'
import userRoutes from './modules/routes'
import productRoutes from './modules/product/routes'
import cartRoutes from './modules/cart/routes'
import bundleRoutes from './modules/bundles/routes'
import { verify_token } from './middlewares/verifyJWT'
const router = express.Router()

router.use('/user', userRoutes)

router.use(verify_token)
router.use('/user/product', productRoutes)
router.use('/user/cart', cartRoutes)
router.use('/user/bundle', bundleRoutes)

export default router