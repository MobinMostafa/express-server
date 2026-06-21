import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import {Pool} from "pg"

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express()
const port = process.env.PORT


const pool = new Pool({
   connectionString: process.env.DATABASE_URL, 
})


const initialDb = async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )   
    `);

    await pool.query(`CREATE TABLE IF NOT EXISTS todos (  
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )   
    `)
      
}

// parser 

initialDb()

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