import express from 'express'
import { createGallery, updateGallery, getAllGalleries, getGallery, deleteGallery } from '../controllers/gallery.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-gallery', verifyToken, createGallery)
router.post('/update-gallery/:id', verifyToken, updateGallery)
router.get('/all-galleries', getAllGalleries)
router.get('/gallery/:id', getGallery)
router.delete('/delete/:id', verifyToken, deleteGallery)



export default router