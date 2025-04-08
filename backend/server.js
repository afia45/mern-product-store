//const express = require('express');
//npm run dev
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//for deployment - 1
const __dirname = path.resolve();

//get api
// app.get("/", (req,res)=>{
//     res.send("Server is ready");
// })

// console.log(process.env.MONGO_URI);

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

//for deployment - 2
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*name", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

//Postman

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});


// partypopper88   dU8pa0nZyBLWeXTI