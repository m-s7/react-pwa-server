import {
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthToken } from './types/auth-token'
import { LocalAuthGuard } from './strategies/local.guard'
import { AuthService } from './auth.service'
import { Request as ExpressRequest } from 'express'
import { User } from '@prisma/client'
import { RefreshTokenGuard } from './strategies/refresh-token.guard'

type AuthRequest = ExpressRequest & { user: Omit<User, 'password'> }

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest): Promise<AuthToken> {
    return this.authService.login(req.user)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req: ExpressRequest) {
    const user = req.user as any
    const id = user.sub
    const refreshToken = req
      .header('authorization')
      ?.replace('Bearer ', '')
      .trim()

    if (!refreshToken) throw new UnauthorizedException()

    return this.authService.refreshTokens(id, refreshToken)
  }
}
