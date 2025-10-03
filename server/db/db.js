const mongoose = require("mongoose")
require("dotenv").config()

const connectToDB = async() =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/interViewTask")
        console.log(">>>>>> Connect to DB >>>>>>>")
    } catch (error) {
        console.log(error || "Error while connecting to db")
    }
}

module.exports = connectToDB