import Router from 'express'
import { Request, Response } from 'express'
import { pool } from '../../config/db'
import { userController } from './user.controller'


const router = Router()

router.get('/', (req, res) => {
    res.send('User route is working!')
})

// create user
router.post('/create', userController.createUser)

// read user 

router.get("/data", userController.getAllUsers) 

// single user 

router.get('/user/:id', userController.getSingleUser)


// update user 

router.put("/users/:id", userController.updateUser)


// delete user 

router.delete("/users/:id", userController.deleteUser)


export const userRouter = router