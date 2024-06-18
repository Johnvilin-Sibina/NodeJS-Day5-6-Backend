import User from '../Models/userSchema.js'
import bcrypt from 'bcryptjs'

export const registerUser = async(req,res)=>{
    try {
        const {userName,email,password} = req.body
        const hashPassword = await bcrypt.hash(password,10)
        //console.log(hashPassword)
        const newUser = new User({userName,email,password:hashPassword})
        await newUser.save();
        res.status(200).json({message:"User Registered Successfully",data:newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Registration Failed Internal Server Error"})
    }
}

export const loginUser = async(req,res)=>{
try {
    const {email,password} = req.body
    const userDetail = await User.findOne({email})
if(!userDetail){
    return res.status(401).json({message:"User Not Found"})
}
const passwordMatch = await bcrypt.compare(password,userDetail.password)
if(!passwordMatch){
    return res.status(401).json({message:"Invalid Password"})
}
    res.status(200).json({message:"User Logged In Successfully"})
} catch (error) {
  console.log(error)
  res.status(500).json({message:"Login Failed Internal Server Error"})  
}
}