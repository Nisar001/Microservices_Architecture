import express from 'express'
import { getAllProducts, getProduct, getProductsByCategory } from '../controller'

const router = express.Router()

router.get('/get-product', getProduct)
router.get('/get-all-products', getAllProducts)
router.get('/get-all-products-category', getProductsByCategory)

export default router