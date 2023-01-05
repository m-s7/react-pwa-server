import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AuthToken } from './types/auth-token'
import { AuthenticatedUser } from './types/authenticated-user'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: AuthenticatedUser): Promise<AuthToken> {
    const payload = { username: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
