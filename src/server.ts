import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import {Pool} from "pg"

dotenv.config()

const app = express()
const port = process.env.PORT


const pool = new Pool({
   connectionString: process.env.DATABASE_URL, 
})

// parser 

app.use(express.json())

app.use(express.urlencoded())

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.post('/data', (req: Request, res: Response) => {
  console.log('Data received!')
  console.log(req.body) // Assuming you have body-parser middleware to parse JSON body
  res.status(201).json({
    success: true,
    message: 'Data received successfully'
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})