import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import UserRepository from "@repositories/UserRepository"
import UserService from "@services/UserService"
import LoginUserController from "@controllers/user/LoginUserController"
import RegisterUserController from "@controllers/user/RegisterUserController"
import Validation from "@shared/Validation"
import Security from "@shared/Security"

// <Dependencies>
const prismaClient = new PrismaClient({})
const validation = new Validation()
const security = new Security()

// <Repositories>
const userRepository = new UserRepository(prismaClient)

// <Services>
const userService = new UserService(userRepository, validation, security)

// <Controllers>

// User Controllers
const loginUserController = new LoginUserController(userService, security)
const registerUserController = new RegisterUserController(userService)

// Routes
const userRoutes = Router()
userRoutes.post('/login', loginUserController.run)
userRoutes.post('/register', registerUserController.run)


const router = Router()

router.use('/users', userRoutes)

export default router