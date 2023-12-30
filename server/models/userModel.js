import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
})

export const userSchema = mongoose.model("users", schema)