import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUser({ id: Number(id) })

    if (!user) throw new NotFoundException() //TODO: add interceptor

    return user
  }

  @Get()
  get(): Promise<User[]> {
    return this.userService.getUsers({})
  }
}
