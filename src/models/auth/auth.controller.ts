import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthToken } from './types/auth-token'
import { LocalAuthGuard } from './strategies/local.guard'
import { AuthService } from './auth.service'
import { Request as ExpressRequest } from 'express'
import { User } from '@prisma/client'

type AuthRequest = ExpressRequest & { user: Omit<User, 'password'> }

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest): Promise<AuthToken> {
    return this.authService.login(req.user)
  }
}
