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


//  create 
app.post('/users', async (req: Request, res: Response) => {
  console.log('Data received!')
  // console.log(req.body) // Assuming you have body-parser middleware to parse JSON body
  const {name, email, age, phone, address} = req.body

    try{
     const result = await pool.query(`INSERT INTO users (name, email, age, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, age, phone, address])
    }
      catch (error: any) {
          res.status(500).json({
              success: false,
              message: 'Error inserting data into database',
              error: error.message
          })
      }
  // res.status(201).json({
  //   success: true,
  //   message: 'Data received successfully'
  // })

})

// read 

app.get('/users', async (req: Request, res: Response) => {
  try {
      const result = await pool.query(`SELECT * FROM users`)
      res.status(200).json({
          success: true,
          data: result.rows
      })
  } catch (error: any) {
      res.status(500).json({
          success: false,
          message: 'Error fetching data from database',
          error: error.message
      })
  }
})

// single data read 

app.get('/users/:id', async (req: Request, res: Response) => {
   try{
    const {id} = req.params
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    res.status(200).json({
        success: true,
        data: result.rows[0]
    })
   }catch(error: any){
       res.status(500).json({
            success: false,
            message: 'Error fetching data from database',
            error: error.message
       })
   }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})