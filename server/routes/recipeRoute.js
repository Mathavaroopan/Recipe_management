import { recipeSchema } from "../models/recipeModel.js";

import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from "../models/userModel.js";

const router = express.Router();

router.get('/',  async (req, res) => {
    try{
        const response = await recipeSchema.find({});
        res.json(response);
    }catch(err) {
        res.json(err);      
    }
})

router.post('/',  async (req, res) => {
    
    const recipe = new recipeSchema(req.body);

    try{
        const response = await recipe.save();
        res.json(response);
    }catch(err) {
        res.json(err);      
    }
})

router.put('/', async (req, res) => {

    try{
        const recipe = await recipeSchema.findById(req.body.recipeID);
        const user = await userSchema.findById(req.body.userID);

        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes })
    }catch(err) {
        console.log(err.message);
    }
})

router.get('/savedRecipes/ids/:userID', async(req, res) => {
    try{
        const user = await userSchema.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes })
    }catch(err) {
        console.log(err.message);
    }
})

router.get('/savedRecipes/:userID', async(req, res) => {
    try{
        const user = await userSchema.findById(req.params.userID);

        const savedRecipes = await recipeSchema.find({
            _id: { $in: user.savedRecipes }
        })
        res.json({ savedRecipes })
    }catch(err) {
        console.log(err.message);
    }
})


export { router as recipeRouter };

