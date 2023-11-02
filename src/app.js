import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/students.routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
  console.log(`Server is running: ${PORT}`)
})
