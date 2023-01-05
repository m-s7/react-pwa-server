import { User } from '@prisma/client'

export type AuthenticatedUser = Omit<User, 'password'>
