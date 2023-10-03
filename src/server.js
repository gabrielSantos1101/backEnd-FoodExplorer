import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import dotenv from 'dotenv'
import { routes } from './routes/index.js'
import { AppError } from './utils/AppError.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    optionsSuccessStatus: 200,
  }),
)
app.use(routes)
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
