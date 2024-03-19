//declared dependancies and ascend to variables
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
const employeeRouter = require("./routes/EmployeeCRUD.js");
app.use("/employee",employeeRouter);  

const orderRouter = require('./routes/orderCRUD'); 
app.use("/order", orderRouter);

const paymentRouter = require("./routes/paymentCRUD.js");
app.use("/payment", paymentRouter);

const branchRouter = require("./routes/branchCRUD.js");
app.use("/branch", branchRouter);

const customerRouter = require('./routes/customerCRUD.js');
app.use("/customer", customerRouter);

const superMarketRouter = require("./routes/supermarketCRUD.js");
app.use("/supermarket",superMarketRouter);
const ItemRouter = require("./routes/itemCRUD.js");
app.use("/item",ItemRouter);
const PromotionRouter = require("./routes/promotionCRUD.js");
app.use("/promotion",PromotionRouter);


const driverRouter = require("./routes/driverCRUD.js");
app.use("/driver", driverRouter);
const TaskRouter = require("./routes/taskCRUD.js");
app.use("/task", TaskRouter);

app.listen(PORT, () =>{
    console.log(`Server is up and running no port:  ${PORT}`)
});


/*
//Look how simple the code is

const express = require('express')
const cors = require('cors')
const {db} = require('./db/db')
//for routing
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

//middleware
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1',require('./routes/' + route)))

const PORT = process.env.PORT

const server = () =>{
    db()
    app.listen(PORT,() =>{
        console.log('listening to port : ',PORT)
    })

}

server()*/