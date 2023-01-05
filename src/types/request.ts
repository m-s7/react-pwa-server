import 'express'

export interface RequestBody<T, U = Express.User> extends Express.Request<U> {
  body: T
  user: U
}
