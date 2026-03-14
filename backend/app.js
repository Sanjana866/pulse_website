import express from "express";
import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
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
app.use('/api/donations',donationRoutes);
app.use('/api/ngos',ngoRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started");
    });
});