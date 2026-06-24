import express, {Request, Response} from 'express'
import config from './config'

import initialDb, { pool } from './config/db'
// import logger from './middleware/logger'
import { userRouter } from './modules/users/user.router'



const app = express()


const port = config.port



// parser 

initialDb()

app.use(express.json())

app.use(express.urlencoded())


// app.use('/', logger , userRouter) 
// app.get('/', (req : Request, res : Response) => {
//   res.send('Hello World!')
// })


//  create 
app.use("/users", userRouter)

// app.post('/users', async (req: Request, res: Response) => {
//   console.log('Data received!')
//   // console.log(req.body) // Assuming you have body-parser middleware to parse JSON body
//   const {name, email, age, phone, address} = req.body

//     try{
//      const result = await pool.query(`INSERT INTO users (name, email, age, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, age, phone, address])
//     }
//       catch (error: any) {
//           res.status(500).json({
//               success: false,
//               message: 'Error inserting data into database',
//               error: error.message
//           })
//       }
//   // res.status(201).json({
//   //   success: true,
//   //   message: 'Data received successfully'
//   // })

// })

// read 

// app.get('/users', async (req: Request, res: Response) => {
//   try {
//       const result = await pool.query(`SELECT * FROM users`)
//       res.status(200).json({
//           success: true,
//           data: result.rows
//       })
//   } catch (error: any) {
//       res.status(500).json({
//           success: false,
//           message: 'Error fetching data from database',
//           error: error.message
//       })
//   }
// })

// single data read 

// app.get('/users/:id', async (req: Request, res: Response) => {
//    try{
//     const {id} = req.params
//     const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
//     res.status(200).json({
//         success: true,
//         data: result.rows[0]
//     })
//    }catch(error: any){
//        res.status(500).json({
//             success: false,
//             message: 'Error fetching data from database',
//             error: error.message
//        })
//    }
// })

// app.put("/users/:id", async (req: Request, res: Response) => {
//     try {
//         const {id} = req.params
//         const {name, email, age, phone, address} = req.body
//         const result = await pool.query(`UPDATE users SET name = $1, email = $2, age = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *`, [name, email, age, phone, address, id])
//         res.status(200).json({
//             success: true,
//             data: result.rows[0]
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: 'Error updating data in database',
//             error: error.message
//         })
//     }
// })

// app.delete("/users/:id", async (req: Request, res: Response) => {
//     try {
//         const {id} = req.params
//         const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
//         res.status(200).json({
//             success: true,
//             data: result.rows[0]
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting data from database',
//             error: error.message
//         })
//     }
// })


// todos start 

app.post('/todos', async (req: Request, res: Response) => {
    const {user_id, title, description} = req.body

    try {
        const result = await pool.query(`INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`, [user_id, title, description])
        res.status(201).json({
            success: true,
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error inserting data into database',
            error: error.message
        })
    }
})  





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})