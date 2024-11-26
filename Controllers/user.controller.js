import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



//Register a New User //Signup
export const registerUser = async (req, res) => {
    try {
        const { username, email, password,role} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword,role });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully" ,data:newUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //username match check
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found & Kindly Register First" });
        }
        //password check
        const PasswordMatch = await bcrypt.compare(password, user.password);
        if (!PasswordMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        //Token Generation
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:"1h"});
        user.token = token;
        await user.save();
        res.status(200).json({ message: "Login Successfully Done", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//To get user
export const getUser = async (req, res) => {
    try{
        //const UserId = req.user._id;
    const user = await User.find();
    res.status(200).json({message:"Authorized",data:user});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
       

      
