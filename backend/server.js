//declared dependancies and acend to variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();

//created a port
const PORT = process.env.PORT || 8070;

//used dependancies
app.use(cors());
app.use(bodyParser.json());

//get url
const URL = process.env.MONGODB_URL;

//connect mongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected Successfully");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

//open connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

/* Add your part here */
//const studentRouter = require("./routes/students.js");
//app.use("/student", studentRouter);

//call back function - () =>
app.listen(PORT, () =>{
    console.log(`Server is up and running no port:  ${PORT}`)
});