import express from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
