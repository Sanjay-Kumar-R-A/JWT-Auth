import jwt from "jsonwebtoken";
import User from "../Models/user.schema.js";
import dotenv from "dotenv";

dotenv.config();

//Custom middleware for the authorization process
//next is the method used for moving to the next middleware
const authMiddleware = async (req, res, next) => {
    //To get token
    //const token = req.header("Authorization");
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {   
        return res.status(401).json({ message: "Access Denied" });        
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        console.log(req.user);
        const user = await User.findById(req.user._id);
        if (user.role !== "admin") {
            return res.status(401).json({ message: "Access Denied" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}






export default authMiddleware;