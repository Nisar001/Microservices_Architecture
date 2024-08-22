import express from 'express'
import { addToCart, clearCart, removeProductFromCart, viewCart } from '../controller'

const router = express.Router()

router.post('/add-to-cart', addToCart)
router.get('/view-cart', viewCart)
router.patch('/remove-item', removeProductFromCart)
router.post('/clear-cart', clearCart)

export default router