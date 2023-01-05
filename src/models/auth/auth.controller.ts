import { BadRequestException, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RefreshTokenGuard } from './strategies/refresh-token.guard'
import { JwtResponse } from './types/jwt'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request<never, any, { email: string; password: string }>): Promise<JwtResponse> {
    const { email, password } = req.body

    if (!email || !password) throw new BadRequestException()

    return this.authService.login(email, password)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request): Promise<JwtResponse> {
    const user = req.user
    if (!user) throw new UnauthorizedException()

    const id = user.sub
    const refreshToken = req.header('authorization')?.replace('Bearer ', '').trim()

    if (!refreshToken) throw new UnauthorizedException()

    return this.authService.refreshTokens(id, refreshToken)
  }
}
