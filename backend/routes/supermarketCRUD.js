/*
    supermarket: By Wijesooriya C.D
*/
const router = require("express").Router();
let SuperMarket = require("../models/supermarket_Schema");

router.route("/supermarket-create").post((req,res)=>{
    const SM_Name = req.body.SM_Name;
    const SM_Location = req.body.SM_Location;
    // const SM_Latitude = req.body.SM_Latitude;
    // const SM_Longitude = req.body.SM_Longitude;
    

    const newSuperMarket = new SuperMarket({
        SM_Name,
        SM_Location,
        // SM_Latitude,
        // SM_Longitude
    
    })

    newSuperMarket.save().then(()=>{
        res.json("Supermarket Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/supermarket-all-supermarkets").get((req,res)=>{
    SuperMarket.find().then((supermarkets)=>{
        res.json(supermarkets)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/supermarket-update/:id").put(async(req,res)=>{
    let marketId = req.params.id;
    const {
        SM_Name,
        SM_Location
    } = req.body;

    const updateSuperMarket = {
        SM_Name,
        SM_Location
        // SM_Latitude,
        // SM_Longitude
    }

    const update = await SuperMarket.findByIdAndUpdate(marketId,updateSuperMarket).then(()=>{
        res.status(200).send({status:"Supermarket updated!"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
    
    
})

router.route("/supermarket-delete/:id").delete(async(req,res)=>{
    let marketId = req.params.id;
    await SuperMarket.findByIdAndDelete(marketId).then(()=>{
        res.status(200).send({status:"Supermarket deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete Supermarket",error:err.message});
    })
})

module.exports = router;