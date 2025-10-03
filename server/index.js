const express = require("express");
const connectToDB = require("./db/db");
const studentRoute = require("./route/studentRoutes");
const cors = require("cors")
const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api", studentRoute)


app.listen(3030 , () =>{
    try {
        connectToDB();
        console.log(">>>>>>>> Server is Running >>>>>>>>>")
    } catch (error) {
        console.log(error || "error while server running")
    }
} )