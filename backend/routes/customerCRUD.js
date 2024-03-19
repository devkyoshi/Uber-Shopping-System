/*
    Customer: By Y.L.Jayasinghe
*/

const router = require("express").Router()
let Customer = require("../models/Customer_Schema")

router.route("/customer-register/").post((req,res) =>{
    const Cus_Name = req.body.Cus_Name
    const Cus_Username = req.body.Cus_Username
    const Cus_Password = req.body.Cus_Password
    /*const Cus_Age = Number(req.body.Cus_Age)
    const Cus_Email = req.body.Cus_Email
    const Cus_CNumber = Number(req.body.Cus_CNumber)
    const Cus_Gender = req.body.Cus_Gender
    const Cus_Address = req.body.Cus_Address
    const Cus_Latitude = Number(req.body.Cus_Latitude)
    const Cus_Longtitude = Number(req.body.Cus_Longtitude)
    Customer.Cus_ID = req.params.id*/

    const newCustomer = new Customer({
        Cus_Name,
        Cus_Username,
        Cus_Password,
        /*Cus_ID,
        Cus_Age,
        Cus_Email,
        Cus_Gender,
        Cus_CNumber,
        Cus_Address,
        Cus_Latitude,
        Cus_Longtitude*/
    })

    newCustomer.save().then(()=>{
        res.json("Succefully registered")
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/customer-login").post((req, res) => {
    const { Cus_Username, Cus_Password } = req.body;

    Customer.findOne({ Cus_Username })
        .then((customer) => {
            if (!customer) {
                return res.status(404).json({ message: "Username not found" });
            }

            if (customer.Cus_Password === Cus_Password) {
                customer.save();

                res.json("Successfully logged in");
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });
});

router.route("/customer-profile/:id").get(async (req, res) => {
    /*if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    Customer.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });*/

        let Cus_ID = req.params.id;

        await Customer.findById(Cus_ID).then((user) => {
            res.json({message: "Profile" ,user});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error loading profile" });
        })
});

router.route("/customer-editprofile/:id").put(async (req, res) => {
    let Cus_ID = req.params.id;
    const Cus_Name = req.body.Cus_Name
    const Cus_Username = req.body.Cus_Username
    const Cus_Password = req.body.Cus_Password
    /*const Cus_CNumber = Number(req.body.Cus_CNumber)
    const Cus_Email = req.body.Cus_Email
    const Cus_Username = req.body.Cus_Username
    const Cus_Password = req.body.Cus_Password
    const Cus_Address = req.body.Cus_Address
    const Cus_Latitude = Number(req.body.Cus_Latitude)
    const Cus_Longtitude = Number(req.body.Cus_Longtitude)*/

    const updateCustomer = {
        Cus_Name,
        Cus_Username,
        Cus_Password,
        /*Cus_CNumber,
        Cus_Email,
        Cus_Address,
        Cus_Latitude,
        Cus_Longtitude*/
    }

    await Customer.findByIdAndUpdate(Cus_ID,updateCustomer).then((update) => {
        res.status(200).send({status : "Profile Updated", update});
    }).catch((err) => {
        res.status(500).send({status : "Error with update"});
    })


})

router.route("/customer-remove/:id").delete(async (req,res)=>{
    let Cus_ID = req.params.id;

    await Customer.findByIdAndDelete(Cus_ID).then(()=>{
        res.status(200).send({status:"Account has been removed"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deletion",eror: err.message});
    })
})

module.exports = router