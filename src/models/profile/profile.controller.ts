import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'

@Controller('profile')
export class ProfileController {
  @UseGuards(AccessTokenGuard)
  @Get()
  getProfile(@Request() req: any) {
    return req.user
  }
}
