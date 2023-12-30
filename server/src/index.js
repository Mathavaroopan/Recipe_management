import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from '../routes/userRoute.js';
import { recipeRouter } from '../routes/recipeRoute.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);


const uri = "mongodb+srv://Mathavaroopan:Mathavaroopan2004@cluster0.7yanlbp.mongodb.net/?retryWrites=true&w=majority"

const mongoConnect = async() => {
    try{
        await mongoose.connect(uri)
        console.log("Connected")
    }catch(err) {
        console.log(err.message);
    }
}

mongoConnect();

app.listen(3001, () => {
    console.log("Server started!")
})

