import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { UsersRepositories } from '../repositories/UsersRepositories'

interface IAuthenticationRequest {
  email: string
  password: string
}

class AuthenticationUserService {
  async execute({ email, password }: IAuthenticationRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    const userEmail = await usersRepository.findOne({ email })

    if (!userEmail) {
      throw new Error(
        'Your email and/or password are incorrect, please try again'
      )
    }

    const passwordMatch = await compare(password, userEmail.password)

    if (!passwordMatch) {
      throw new Error(
        'Your email and/or password are incorrect, please try again'
      )
    }

    const token = sign(
      { email: userEmail.email },
      '4a2990b24bd688fa2ebe286f31eb27fb',
      {
        subject: userEmail.id,
        expiresIn: '1d'
      }
    )
    return token
  }
}

export { AuthenticationUserService }
