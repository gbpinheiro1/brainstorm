export interface AuthUser {
  id: string
  name: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser
    }
  }
}
