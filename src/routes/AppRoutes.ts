import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import UserRepository from "@repositories/UserRepository"
import TagRepository from "@repositories/TagRepository"
import LinkRepository from "@repositories/LinkRepository"
import UserService from "@services/UserService"
import TagService from "@services/TagService"
import LinkService from "@services/LinkService"
import LoginUserController from "@controllers/user/LoginUserController"
import RegisterUserController from "@controllers/user/RegisterUserController"
import CreateTagController from "@controllers/tag/CreateTagController"
import DeleteTagController from "@controllers/tag/DeleteTagController"
import GetAllTagController from "@controllers/tag/GetAllTagController"
import GetAllLinkController from "@controllers/link/GetAllLinkController"
import CreateLinkController from "@controllers/link/CreateLinkController"
import DeleteLinkController from "@controllers/link/DeleteLinkController"
import AddTagOnLinkController from "@controllers/link/AddTagOnLinkController"
import DeleteTagOnLinkController from "@controllers/link/DeleteTagOnLinkController"
import CheckTokenMiddleware from "@middlewares/user/CheckTokenMiddleware"
import Validation from "@shared/Validation"
import Security from "@shared/Security"

// <Dependencies>
const prismaClient = new PrismaClient({})
const validation = new Validation()
const security = new Security()

// <Repositories>
const userRepository = new UserRepository(prismaClient)
const tagRepository = new TagRepository(prismaClient)
const linkRepository = new LinkRepository(prismaClient)

// <Services>
const userService = new UserService(userRepository, validation, security)
const tagService = new TagService(tagRepository, validation)
const linkService = new LinkService(linkRepository, tagRepository, validation)

// <Middlewares>
const checkTokenMiddleware = new CheckTokenMiddleware(security)

// <Controllers>

// User Controllers
const loginUserController = new LoginUserController(userService, security)
const registerUserController = new RegisterUserController(userService)

// Tag Controllers
const createTagController = new CreateTagController(tagService)
const deletetagController = new DeleteTagController(tagService)
const getAllTagController = new GetAllTagController(tagService)

// Link Controllers
const getAllLinkController = new GetAllLinkController(linkService)
const createLinkController = new CreateLinkController(linkService)
const deleteLinkController = new DeleteLinkController(linkService)
const addTagOnLinkController = new AddTagOnLinkController(linkService)
const deleteTagOnLinkController = new DeleteTagOnLinkController(linkService)

// Routes
const userRoutes = Router()
userRoutes.post('/login', loginUserController.run)
userRoutes.post('/register', registerUserController.run)

const tagRoutes = Router()
tagRoutes.get('/', getAllTagController.run)
tagRoutes.post('/', createTagController.run)
tagRoutes.delete('/:tagId', deletetagController.run)

const linkRoutes = Router()
linkRoutes.get('/', checkTokenMiddleware.run, getAllLinkController.run)
linkRoutes.post('/', createLinkController.run)
linkRoutes.delete('/:linkId', deleteLinkController.run)
linkRoutes.post('/:linkId/tags/:tagId', addTagOnLinkController.run)
linkRoutes.delete('/:linkId/tags/:tagId', deleteTagOnLinkController.run)


const router = Router()

router.use('/users', userRoutes)
router.use('/tags', checkTokenMiddleware.run, tagRoutes)
router.use('/links', checkTokenMiddleware.run, linkRoutes)

export default router