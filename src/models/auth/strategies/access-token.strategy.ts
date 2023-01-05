import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants'
import { User } from '@prisma/client'

// type Payload = {
//   username: string
//   sub: number
//   iat: number
//   exp: number
// }

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: jwtConstants.accessSecret,
    })
  }

  async validate(payload: any): Promise<any> {
    const { iat, exp, sub, refreshToken, ...user } = payload

    return { id: sub, ...user }
  }
}
