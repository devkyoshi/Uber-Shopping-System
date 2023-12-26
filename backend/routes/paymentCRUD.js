/*
    Payment: By Ashan
*/

const router = require("express").Router();
let Payment = require("../models/payment");

//Create Payment
router.route("/create-payment").post((req,res)=>{
    const customerID = req.body.customerID;
    const paymentID = req.body.paymentID;
    const paymentStatus = req.body.paymentStatus;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const DeliveryAddress = req.body.DeliveryAddress;
    const paymentType = req.body.paymentType;
    const nameOnCard = req.body.nameOnCard;
    const creditCardNumber = req.body.creditCardNumber;
    const expDate = req.body.expDate;
    const cvv = req.body.cvv;
    const total = Number(req.body.total);
    const paymentTimeStamp = new Date(req.body.paymentTimeStamp);

    const newPayment = new Payment({
        customerID,
        paymentID,
        paymentStatus,
        firstName,
        lastName,
        username,
        email,
        DeliveryAddress,
        paymentType,
        nameOnCard,
        creditCardNumber,
        expDate,
        cvv,
        total,
        paymentTimeStamp
    })

    newPayment.save().then(()=>{
        res.json("Payment Added To the Database")
    }).catch((err)=>{
        console.log(err);
    })
})

//Selecting All Payment
router.route("/").get((req,res)=>{
    Payment.find().then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err);
    })
})

//Update Payment
router.route("/update-payment/:id").put(async(req,res)=>{
    let payID = req.params.id;
    const {
        customerID,
        paymentID,
        paymentStatus,
        firstName,
        lastName,
        username,
        email,
        DeliveryAddress,
        paymentType,
        nameOnCard,
        creditCardNumber,
        expDate,
        cvv,
        total,
        paymentTimeStamp
    } = req.body;

    const updatePayment = {
        customerID,
        paymentID,
        paymentStatus,
        firstName,
        lastName,
        username,
        email,
        DeliveryAddress,
        paymentType,
        nameOnCard,
        creditCardNumber,
        expDate,
        cvv,
        total,
        paymentTimeStamp
    }

    const update = await Payment.findByIdAndUpdate(payID,updatePayment).then(()=>{
        res.status(200).send({status: "Payment Updated!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating Payment Data! ", error: err.message});
    })
})

router.route("/delete-payment/:id").delete(async(req,res)=>{
    let payID = req.params.id;

    await Payment.findByIdAndDelete(payID).then(()=>{
        res.status(200).send({status: "Payment Removed!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with Deleting Payment! ", error: err.message});
    })
})

router.route("/select-payment/:id").get(async(req,res)=>{
    let payID = req.params.id;

    const payment = await Payment.findById(payID).then((payment)=>{
        res.status(200).send({status: "Payment Details Fetched!", payment});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;