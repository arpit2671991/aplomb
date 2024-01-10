import express from 'express'
import {  } from '../controllers/gallery.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-gallery', verifyToken)
router.post('/update-gallery/:id', verifyToken)
router.get('/all-galleries')
router.get('/gallery/:id')
router.delete('/delete/:id', verifyToken)



export default router