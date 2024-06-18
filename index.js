import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import userRouter from "./Routers/userRoute.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//DB connection
connectDB();

//Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the app");
});

//API routes
app.use('/api/user',userRouter)

app.listen(process.env.port, () => {
  console.log("App is running on the port");
});
