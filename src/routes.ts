import { Router } from 'express'

import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticationUserController } from './controllers/AuthenticationUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'

import { unsureAdmin } from './middlewares/unsureAdmin'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticationUserController = new AuthenticationUserController()
const createComplimentController = new CreateComplimentController()

router.post('/tags', unsureAdmin, createTagController.handle)
router.post('/users', createUserController.handle)
router.post('/login', authenticationUserController.handle)
router.post('/compliment', createComplimentController.handle)

export { router }
