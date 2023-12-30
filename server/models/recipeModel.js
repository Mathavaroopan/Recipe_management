import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String, required: true},
    ingredients: [{type: String, required: true}],
    instructions: { type: String, required: true},
    imageUrl: { type: String, required: true},
    cookingTime: { type: Number, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

})

export const recipeSchema = mongoose.model("recipes", schema)