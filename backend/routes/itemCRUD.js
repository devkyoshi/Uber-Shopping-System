/*
    Item: By Wijesooriya C.D
*/
const router = require("express").Router();
let Item = require("../models/item_Schema");

router.route("/item-create").post((req,res)=>{
    const Item_Name = req.body.Item_Name;
    const price = Number(req.body.price);
    const available_quantity = Number(req.body.available_quantity);
    const description = req.body.description;
    

    const newItem = new Item({
        Item_Name,
        price,
        available_quantity,
        description
    
    })

    newItem.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/item-all-items").get((req,res)=>{
    Item.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/item-update/:id").put(async(req,res)=>{
    let itemId = req.params.id;
    const {
        Item_Name,
        price,
        available_quantity,
        description
    } = req.body;

    const updateItem = {
        Item_Name,
        price,
        available_quantity,
        description
    }

    const update = await Item.findByIdAndUpdate(itemId,updateItem).then(()=>{
        res.status(200).send({status:"Item updated!"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    });
    
    
})

router.route("/item-delete/:id").delete(async(req,res)=>{
    let itemid = req.params.id;
    await Item.findByIdAndDelete(itemid).then(()=>{
        res.status(200).send({status:"Item deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete Item",error:err.message});
    })
})

module.exports = router;