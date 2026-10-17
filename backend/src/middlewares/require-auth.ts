import type { NextFunction, Request, Response } from "express"
import { fromNodeHeaders } from "better-auth/node"
import { auth } from "../auth.ts"

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
      res.status(401).json({
        code: "UNAUTHORIZED",
        message: "Você precisa estar autenticado para acessar este recurso.",
      })
      return
    }

    req.authUser = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    }

    next()
  } catch (error) {
    next(error)
  }
}
