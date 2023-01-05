import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants'
import { Request } from 'express'
import { AuthService } from '../auth.service'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies['refresh-token'] ?? null]),
      passReqToCallback: true,
      secretOrKey: jwtConstants.refreshSecret,
    })
  }

  async validate(req: Request, payload: Express.User): Promise<Express.User> {
    const refreshToken = req.cookies['refresh-token']
    const isValid = await this.authService.validateRefreshToken(payload.sub, refreshToken).then()

    if (!isValid) throw new UnauthorizedException()

    return payload
  }
}
