import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'
import { RequestBody } from '../../types/request'

@Controller('profile')
export class ProfileController {
  @UseGuards(AccessTokenGuard)
  @Get()
  getProfile(@Req() req: RequestBody<Record<string, any>>): Express.User | undefined {
    return req.user
  }
}
