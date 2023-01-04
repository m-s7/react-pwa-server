import { Injectable } from '@nestjs/common'

@Injectable()
export class PostService {
  getPosts(): string {
    return 'posts'
  }

  getPost(id: string): string {
    return `post-${id}`
  }
}
