import { Request, Response } from 'express'

import { AuthenticationUserService } from '../services/AuthenticateUserService'

class AuthenticationUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticationUserService = new AuthenticationUserService()

    const token = await authenticationUserService.execute({ email, password })

    return res.json(token)
  }
}

export { AuthenticationUserController }
