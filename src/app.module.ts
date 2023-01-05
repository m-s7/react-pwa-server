import { Module } from '@nestjs/common'
import { PostModule } from './models/post/post.module'
import { UserModule } from './models/user/user.module'
import { AuthModule } from './models/auth/auth.module'
import { ProfileModule } from './models/profile/profile.module'

@Module({
  imports: [UserModule, PostModule, AuthModule, ProfileModule],
})
export class AppModule {}
