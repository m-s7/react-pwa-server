export {}

declare global {
  namespace Express {
    interface User {
      sub: number
      email: string
      createdAt: Date
      updatedAt: Date
      iat: number
      exp: number
    }

    export interface Request {
      user: User
    }
  }
}
