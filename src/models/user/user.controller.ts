import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUser({ id: Number(id) })

    if (!user) throw new NotFoundException() //TODO: add interceptor

    return user
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  get(): Promise<User[]> {
    return this.userService.getUsers({})
  }
}
