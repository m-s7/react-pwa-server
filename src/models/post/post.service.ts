import { Injectable, NotFoundException } from '@nestjs/common'
import { Post } from './types/post'

const posts: Post[] = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 9, title: 'Post 8' },
  { id: 8, title: 'Post 9' },
]

@Injectable()
export class PostService {
  getAll(): Post[] {
    return posts
  }

  getOne(id: string): Post {
    const post = posts.find((post) => post.id === Number(id))

    if (!post) throw new NotFoundException()

    return post
  }
}
