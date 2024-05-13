//declared dependancies and ascend to variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const images = require("../backend/routes/multerConfig.js");
// Serve static files from the 'uploads' directory
app.use("/images", express.static("images"));

//created a port
const PORT = process.env.PORT || 8070;

//used dependancies
app.use(cors());
app.use(bodyParser.json());

//get url
const URL = process.env.MONGODB_URL;

//connect mongoDB
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//open connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success!");
});

/* Add your part here */

const QualityRouter = require("./routes/complaintCRUD.js");
app.use("/quality", QualityRouter);
const Order = require("./routes/orderCRUD.js");
app.use("/Order", Order);
const Customer = require("./routes/customer/customer.register.routes.js");
app.use("/customer", Customer);
const Payment = require("./routes/paymentCRUD.js");
app.use("/Payment", Payment);
// const Revenue = require("./routes/revenueCRUD.js");
// app.use("/Revenue", Revenue);
const Task = require("./routes/taskCRUD.js");
app.use("/Task", Task);
const Driver = require("./routes/driverCRUD.js");
app.use("/Driver", Driver);
const Supermarket = require("./routes/supermarketCRUD.js");
app.use("/Supermarket", Supermarket);
const Items = require("./routes/itemsCRUD.js");
app.use("/Items", Items);
const Promotion = require("./routes/promotionCRUD.js");
app.use("/Promotion", Promotion);
const Complaint = require("./routes/complaintCRUD.js");
app.use("/Complaint", Complaint);
const Refund = require("./routes/refundCRUD.js");
app.use("/Refund", Refund);
const Report = require("./routes/reportCRUD.js");
app.use("/Report", Report);
const Branch = require("./routes/branchCRUD.js");
app.use("/Branch", Branch);
const Revenue = require("./routes/revenueCRUD.js");
app.use("/Revenue", Revenue);

//generate performance
const qualityGenerateRoutes = require("./routes/quality_performance.routes.js");
app.use("/Quality/Generate", qualityGenerateRoutes);

const customerfeedbackRouter = require("./routes/customer/customer.feedback.routes.js");
app.use("/Feedback", customerfeedbackRouter);

//test connection
const userRoutes = require("./routes/user.route.js");
app.use("/api/user", userRoutes);
//register authentication
const authroutes = require("./routes/Employee_authentication.route.js");
app.use("/api/auth", authroutes);
//posting stuff
const announcementroutes = require("./routes/announcement.route.js");
app.use("/api/announcement", announcementroutes);
//price comparison - adding supermarkets in to the list
const comparisonRouter = require("./routes/comparisonCRUD");
app.use("/comparison", comparisonRouter);
const customerRatingRouter = require("./routes/customer/customer.rating.routes.js");
app.use("/Rating", customerRatingRouter);

const Delivery = require("./routes/deliveryCRUD.js");
app.use("/Delivery", Delivery);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running no port:  ${PORT}`);
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
