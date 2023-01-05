import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './strategies/local.guard'
import { AuthService } from './auth.service'
import { User } from '@prisma/client'
import { RefreshTokenGuard } from './strategies/refresh-token.guard'
import { JwtResponse } from './types/jwt'
import { RequestBody } from '../../types/request'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestBody<any, Omit<User, 'password'>>): Promise<JwtResponse> {
    return this.authService.login(req.user)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Express.Request): Promise<JwtResponse> {
    const user = req.user
    if (!user) throw new UnauthorizedException()

    const id = user.sub
    const refreshToken = req.header('authorization')?.replace('Bearer ', '').trim()

    if (!refreshToken) throw new UnauthorizedException()

    return this.authService.refreshTokens(id, refreshToken)
  }
}
