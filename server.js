const express = require("express")
const app = require("./app")
const dotenv = require('dotenv').config();
const connectDatabase = require("./config/index")

connectDatabase()
const server = app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`Server is working on Port: ${process.env.PORT}`)
})