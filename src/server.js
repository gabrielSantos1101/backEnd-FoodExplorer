import express from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.js'
import { AppError } from './utiuls/appError.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(routes)
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status || 500).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
  next()
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
