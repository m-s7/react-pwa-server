import { User } from '@prisma/client'
import { Request as ExpressRequest } from 'express'

export type Auth = Pick<User, 'email' | 'password'>
export type AuthenticatedUser = Omit<User, 'password'>
export type AuthRequest = ExpressRequest<
  any,
  any,
  Pick<User, 'email' | 'password'>
>
