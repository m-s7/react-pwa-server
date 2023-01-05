import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants'
import { Request } from 'express'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies['access-token'] ?? null]),
      passReqToCallback: true,
      secretOrKey: jwtConstants.accessSecret,
    })
  }

  async validate(req: Request, payload: Express.User): Promise<Express.User> {
    return payload
  }
}
