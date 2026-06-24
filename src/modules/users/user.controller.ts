import { Request, Response } from 'express'
import { pool } from '../../config/db'
import { userService } from './user.services'




const createUser =  async (req: Request, res: Response) => {
  console.log('Data received!')
  // console.log(req.body) // Assuming you have body-parser middleware to parse JSON body
  const {name, email, age, phone, address} = req.body

    try{
     const result = await userService.createUser(name, email, age, phone, address)
     res.status(201).json({
         success: true,
         data: result.rows[0]
     })
    }
      catch (error: any) {
          res.status(500).json({
              success: false,
              message: 'Error inserting data into database',
              error: error.message
          })
      }
}


// get user 
const getAllUsers =  async (req: Request, res: Response) => {
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
}

// get single user
const getSingleUser =  async (req: Request, res: Response) => {
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
}

// update user 

const updateUser =   async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {name, email, age, phone, address} = req.body
        const result = await pool.query(`UPDATE users SET name = $1, email = $2, age = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *`, [name, email, age, phone, address, id])
        res.status(200).json({
            success: true,
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error updating data in database',
            error: error.message
        })
    }
}


// delet user 

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
        res.status(200).json({
            success: true,
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting data from database',
            error: error.message
        })
    }
}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}
 