const express = require("express");
const connectToDB = require("./db/db");
const studentRoute = require("./route/studentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", studentRoute);

app.listen(3030, async () => {
  try {
    await connectToDB();
    console.log(">>>>>> Server is Running >>>>>>>>>");
  } catch (error) {
    console.log(error || "Error while server running");
  }
});
