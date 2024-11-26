import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbconfig.js";
import userRouter from "./Routers/user.router.js";

//.env configuration
dotenv.config();

//express initialization
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//database connection
connectDB();


//default route
app.get("/", (req, res) => {
    res.status(200).send("JWT-Authorization & Authentication - API");
});

app.use("/api/user-Auth", userRouter);

//PORT value declaration
const port = process.env.PORT || 4000;

//Server initialization
app.listen(port, () => {
    console.log("Server is started successfully  for JWT-Authorization & Authentication");
});