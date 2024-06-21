import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    token:String,
    role:String
})

const User = mongoose.model("User",userSchema)

export default User;