import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import * as argon2 from 'argon2'
import { User } from '@prisma/client'
import { JwtResponse } from './types/jwt'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.getUser({ email: email })

    if (user && user.password === password) {
      const { password, ...result } = user

      return result
    }

    return null
  }

  async login(user: Omit<User, 'password'>): Promise<JwtResponse> {
    const { id } = user

    const payload = {
      sub: id,
      username: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessSecret,
        expiresIn: '15m',
      }),
      await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: '7d',
      }),
    ])

    await this.updateRefreshToken(id, refreshToken)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.usersService.updateUser({
      where: {
        id: id,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    })
  }

  async refreshTokens(id: number, refreshToken: string): Promise<JwtResponse> {
    const user = await this.usersService.getUser({ id: id })
    if (!user || !user.refresh_token) throw new UnauthorizedException()

    const refreshTokenMatches = await argon2.verify(user.refresh_token, refreshToken)
    if (!refreshTokenMatches) throw new UnauthorizedException()

    const tokens = await this.login(user)
    await this.updateRefreshToken(user.id, tokens.refresh_token)

    return tokens
  }

  hashData(data: string): Promise<string> {
    return argon2.hash(data)
  }
}
