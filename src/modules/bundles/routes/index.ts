import express from 'express'
import { getAllBundle, getBundle } from '../controller'
const router = express.Router()

router.get('/get-bundle', getBundle)
router.get('/get-all-bundles', getAllBundle)

export default router