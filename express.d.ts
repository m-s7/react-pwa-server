export {}

declare global {
  namespace Express {
    interface User {
      sub: number
      username: string
      createdAt: Date
      updatedAt: Date
      iat: number
      exp: number
    }

    interface Request<B = unknown, U = Express.User> {
      body: B
      user: U
      header: (string) => string
    }
  }
}
