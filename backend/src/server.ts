import express from "express"
import type { Request, Response } from "express"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Olá!")
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
