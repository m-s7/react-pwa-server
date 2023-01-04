import { Controller, Get, Param } from '@nestjs/common'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  get(): string {
    return this.postService.getPosts()
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.postService.getPost(id)
  }
}
