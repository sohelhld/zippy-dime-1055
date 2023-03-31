const express = require('express');
const mongoose = require('mongoose');
const { connected } = require('./db');
const { auth } = require('./middleware/auth.middleware');
const { productRouter } = require('./routes/products.route');
const { userRouter } = require('./routes/user.router');
const cors = require("cors");
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors());
app.use("/users",userRouter)
app.use(auth)
app.use("/products",productRouter)


app.listen(process.env.port,async(req,res)=>{

    try {
        await connected
        console.log("connected to db ");
    } catch (err) {
        console.log(err);
    }
    console.log("server is runing");
})