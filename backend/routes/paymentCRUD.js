/*
    Payment: By Prasad H.G.A.T
*/

const router = require("express").Router();
let Payment = require("../models/payment");

//Create Payment
router.route("/payment-create").post((req,res)=>{
    const Payment_Amount = Number(req.body.Payment_Amount);
    const CVV = req.body.CVV;
    const Payment_Method = req.body.Payment_Method;
    const Paid_Time = new Date(req.body.Paid_Time);
    const Account_Number = req.body.Account_Number;
    const Account_Holder = req.body.Account_Holder;;
    const Payment_Status = req.body.Payment_Status;
    
    const newPayment = new Payment({
        Payment_Amount,
        CVV,
        Date,
        Payment_Method,
        Paid_Time,
        Account_Number,
        Account_Holder,
        Payment_Status
    })

    newPayment.save().then(()=>{
        res.json("Payment Added To the Database")
    }).catch((err)=>{
        console.log(err);
    })
})

//Selecting All Payment
router.route("/payment-all-payments").get((req,res)=>{
    Payment.find().then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err);
    })
})

//Update Payment
router.route("/payment-update/:id").put(async(req,res)=>{
    let payID = req.params.id;
    const {
        Payment_Amount,
        CVV,
        Date,
        Payment_Method,
        Paid_Time,
        Account_Number,
        Account_Holder,
        Payment_Status
    } = req.body;

    const updatePayment = {
        Payment_Amount,
        CVV,
        Date,
        Payment_Method,
        Paid_Time,
        Account_Number,
        Account_Holder,
        Payment_Status
    }

    const update = await Payment.findByIdAndUpdate(payID,updatePayment).then(()=>{
        res.status(200).send({status: "Payment Updated!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating Payment Data! ", error: err.message});
    })
})

router.route("/payment-delete/:id").delete(async(req,res)=>{
    let payID = req.params.id;

    await Payment.findByIdAndDelete(payID).then(()=>{
        res.status(200).send({status: "Payment Removed!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with Deleting Payment! ", error: err.message});
    })
})

router.route("/payment-select/:id").get(async(req,res)=>{
    let payID = req.params.id;

    const payment = await Payment.findById(payID).then((payment)=>{
        res.status(200).send({status: "Payment Details Fetched!", payment});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with retrieving Payment Details", error: err.message});
    })
})

module.exports = router;