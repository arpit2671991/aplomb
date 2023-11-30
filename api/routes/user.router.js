import express from 'express'
import { userUpdate } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'


// variables

const router = express.Router()


// routes
router.get('/test', (req, res, next) => {
    res.status(200).json({message: 'welcome'})
})

router.post('/update/:id', verifyToken, userUpdate )












export default router