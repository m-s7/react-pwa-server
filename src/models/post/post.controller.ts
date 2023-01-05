import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
import { AccessTokenGuard } from '../auth/strategies/access-token.guard'
import { Post } from './types/post'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  get(): Post[] {
    return this.postService.getAll()
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  getOne(@Param('id') id: string): Post {
    return this.postService.getOne(id)
  }
}
