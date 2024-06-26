import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password,role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    //console.log(hashPassword)
    const newUser = new User({ userName, email, password: hashPassword, role });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration Failed Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    //JWT part - token creation after login
    const token = jwt.sign(
      { _id: userDetail._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    userDetail.token = token;
    await userDetail.save();
    res.status(200).json({ message: "User Logged In Successfully",token:token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed Internal Server Error" });
  }
};

export const getUser = async(req,res)=>{
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    res.status(200).json({message:"Authorized user",data:[user]}) 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error Failed to Fetch User" });
  }
}