import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthRequest, Auth } from './interfaces/auth'
import { LocalAuthGuard } from './strategies/local.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest): Promise<Auth> {
    return req.body
  }
}
