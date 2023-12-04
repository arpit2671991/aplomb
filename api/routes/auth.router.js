import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

// variables

const router = express.Router()


// routes
router.get('/test', (req, res, next) => {
    res.status(200).json({message: 'welcome'})
})

router.post('/signup', signup)
router.post('/signin',  signin)
router.get('/signout', signout )












export default router