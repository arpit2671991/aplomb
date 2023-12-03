import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

// variables

const router = express.Router()


// routes
router.get('/test', (req, res, next) => {
    res.status(200).json({message: 'welcome'})
})

router.post('/signup', signup)
router.post('/signin',  signin)












export default router