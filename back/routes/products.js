const express = require("express");
const router = express.Router();
const Product = require("../models/product")
const User = require ("../models/user")
const Order = require ("../models/order")
const Frame = require("../models/frame")
const Size = require("../models/size")
const Style = require("../models/style")


router.post("/newProduct",function(req,res){
   
    User.findByPk(req.user.id)
    .then((user)=>{
        
        Product.create(req.body)
        .then((product)=>{
                product.setUser(user)
        })
        .then(()=>{
            Order.create(req.body)
        })
        .then((order)=>{
            Product.setOrder(order)
        }).then(()=>{
            Frame.findByPk(req.body.frameId)
            .then((frame)=>{
                Product.setFrame(frame)
            })
        })
        .then(()=>{
            Size.findByPk(req.body.sizeId)
            .then((size)=>{
                Product.setFrame(size)
            })
        })
        .then(()=>{
            Style.findByPk(req.body.styleId)
            .then((style)=>{
                Product.setFrame(style)
            })
        })
    })
    .then(()=>{
        res.sendStatus(200)
    })
})


router.get("/getProducts",function(req,res){
    Product.findAll()
    .then(function(products){
        res.json(products)
    })
})


router.get("/:id",function(req,res){
    Product.findByPk(req.params.id)
    .then(function(product){
        res.json(product)
    })
})




router.put("/:id",function(req,res){
    Product.findByPk(req.params.id)
    .then(function(product){
        product.update(req.body)
    })
    .then(function(){
        res.sendStatus(204)
    })
})



router.delete("/:id",function(req,res){
    Product.findByPk(req.params.id)
    .then(function(product){
        product.destroy()
    })
    .then(function(){
        res.sendStatus(200)
    })
})



module.exports= router