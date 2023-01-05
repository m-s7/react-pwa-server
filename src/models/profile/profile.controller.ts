import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'
import { Request } from 'express'

@Controller('profile')
export class ProfileController {
  @UseGuards(AccessTokenGuard)
  @Get()
  getProfile(@Req() req: Request): Express.User {
    const user = req.user

    if (!user) throw new InternalServerErrorException()

    return user
  }
}
