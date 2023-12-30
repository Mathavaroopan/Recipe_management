import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userSchema } from '../models/userModel.js';

const router = express.Router();

router.post('/register', async(req, res) => {
    const { username, password} = req.body;

    const user = await userSchema.findOne({username: username});

    if(user) {
        return res.json({message: "Username already exists..."})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({username, password: hashedPassword});
    console.log(newUser);
    await newUser.save();

    res.json({message: "Successfully registered"});
})


router.post('/login', async(req, res) => {
    const {username, password} = req.body;

    const user = await userSchema.findOne({username});

    if(!user){
        return res.status(201).json({message: "Username doesn't exist..."})
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({message: "Wrong password...."})         
    }

    const token = jwt.sign({id: user._id}, "secret");
    return res.json({token, userID: user._id, message: "You are logged in...."})  
})

export {router as userRouter};