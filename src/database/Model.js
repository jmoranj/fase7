import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, maxLength: 32, required:true },
    email: { type: String, unique: true, required: true},
    password: {type: String, minLength: 6, maxLength: 16, required: true},
})

const postSchema = new mongoose.Schema({
    description: { type: String, maxLength: 256, required: true},
    content: { type: String, required: true}, 
    username: { type: String, lowercase: true, maxLength: 16, required: true},
    date_post: { type: Date, required: true},
    active: { type: Boolean, select:true, required:true}
})

const user = mongoose.model("user", userSchema)
const post = mongoose.model("post", postSchema)

export { user, post }