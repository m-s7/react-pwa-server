export {}

declare global {
  namespace Express {
    export interface User {
      sub: number
      username: string
      createdAt: Date
      updatedAt: Date
      iat: number
      exp: number
    }

    export interface Request<U = Express.User> {
      body: unknown
      user: U
      header: (string) => string
    }
  }
}
