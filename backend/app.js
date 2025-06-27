import express from "express";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app=express();
const PORT=process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/auth',authRoutes);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started");
    });
});