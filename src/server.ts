import express, {Request, Response, NextFunction} from "express"
import { routes } from "./routes"
import { AppError } from "./utils/App-error"
import { ZodError } from "zod"

const PORT = 3333

const app = express()

app.use(express.json())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      issues: err.format(),
    })
  }

  res.status(500).json({
    message: err.message || "Internal server error",
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))