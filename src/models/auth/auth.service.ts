import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AuthenticatedUser } from './interfaces/auth'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.getUser({ email: email })

    if (user && user.password === password) {
      const { password, ...result } = user

      return result
    }

    return null
  }
}
