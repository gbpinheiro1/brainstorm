import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.url(),
  CORS_ORIGIN: z.url(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "O segredo precisa ter ao menos 32 caracteres"),
  BETTER_AUTH_URL: z.url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("Variáveis de ambiente inválidas:")
  console.error(z.prettifyError(parsed.error))
  process.exit(1)
}

export const env = parsed.data
