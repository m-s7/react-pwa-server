import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RefreshTokenGuard } from './strategies/refresh-token.guard'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(204)
  async login(
    @Req() req: Request<never, any, { email: string; password: string }>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { email, password } = req.body

    if (!email || !password) throw new BadRequestException()

    const jwtResponse = await this.authService.login(email, password)

    res.cookie('access-token', jwtResponse.access_token, { httpOnly: true, path: '/' })
    res.cookie('refresh-token', jwtResponse.refresh_token, {
      httpOnly: true,
      path: '/api/auth/refresh',
      domain: 'localhost',
    })
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(204)
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const user = req.user
    if (!user) throw new UnauthorizedException()

    const jwtResponse = await this.authService.refreshTokens(user.sub)

    res.cookie('access-token', jwtResponse.access_token, { httpOnly: true })
    res.cookie('refresh-token', jwtResponse.refresh_token, {
      httpOnly: true,
      path: '/api/auth/refresh',
      domain: 'localhost',
    })
  }
}
