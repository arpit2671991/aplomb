import express from 'express'
import { send } from '../controllers/contact.controller.js'

const router = express.Router()

router.post('/send', send)

export default router