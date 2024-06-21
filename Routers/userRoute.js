import express from 'express'
import { getUser, loginUser, registerUser } from '../Controllers/userController.js'
import authMiddleware from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register-user',registerUser)
router.post('/login-user',loginUser)
router.get("/get-user",authMiddleware,getUser)

export default router