/*
    promotion: By Wijesooriya C.D
*/
const router = require("express").Router();
let Promotion = require("../models/promotion_Schema");

router.route("/promotion-create").post((req,res)=>{
    const discount_Rate = req.body.discount_Rate;
    const Start_date = req.body.Start_date;
    const End_date = req.body.End_date;
  
    

    const newPromotion= new Promotion({
        discount_Rate,
        Start_date,
        End_date
       
    
    })

    newPromotion.save().then(()=>{
        res.json("Promotion Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/promotion-all-promotions").get((req,res)=>{
    Promotion.find().then((promotions)=>{
        res.json(promotions)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/promotion-update/:id").put(async(req,res)=>{
    let promotionid = req.params.id;
    const {discount_Rate,Start_date,End_date} = req.body;

    const updatePromotion = {
        discount_Rate,
        Start_date,
        End_date
       
    }

    const update = await Promotion.findByIdAndUpdate(promotionid,updatePromotion).then(()=>{
        res.status(200).send({status:"promotion updated!"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
    
    
})

router.route("/promotion-delete/:id").delete(async(req,res)=>{
    let promotionid = req.params.id;
    await Promotion.findByIdAndDelete(promotionid).then(()=>{
        res.status(200).send({status:"promotion deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

module.exports = router;