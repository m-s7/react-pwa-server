import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'

@Controller('profile')
export class ProfileController {
  @UseGuards(AccessTokenGuard)
  @Get()
  getProfile(@Req() req: Express.Request): Express.User {
    return req.user
  }
}
