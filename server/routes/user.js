const router = require('express').Router();
const express = require("express");

const User=require('./../models/user');
const auth =require('./../middleware/auth');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }

  const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



var fs = require('fs');
var path = require('path');

router.post("/api/signup",(req,res)=>{
    console.log(req.body);
    const newuser=new User(req.body);
    if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});

    User.findOne({email:newuser.email},(err,user)=>{
        if(user) return res.status(400).json({ auth : false, message :"email exits"});

        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            // const account = await stripe.accounts.create({
            //     type: 'express',
            //     country: "US",
            //     email: req.body.email,
                
            //     capabilities: {
            //       card_payments: {requested: true},
            //       transfers: {requested: true},
            //     },
            // }).catch((err)=>{
            //     console.log(err);
            //           })
                      //stripeId=account.id;
                      //console.log(stripeId);
                      const user1 = new User({
                        
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hash,
                        is_active:0,
                        is_admin:0,
            
                    });
                    user1.save((err,doc)=>{
                      if(err) {console.log(err);
                          return res.status(400).json({ success : false,error:err});}
                          
                      
                          res.status(200).json({
                          success:true,
                          message :"User created successfully!",
                          user : doc
                      });
                    });
                    })
    })
    

})



router.post("/api/login", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email //, username:req.body.username
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
                success:false
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed",
                success:false
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
            success:true,
            message:"Login Successful"
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed",
            success:false,
            error:err
        });
    });
  });
  
  
router.get("/api/users/getAll",auth, ({}, res) => {
    User.find({}).then((users) => {
        res.json(users);
    }).catch(err => {
        res.status(400).json(err);
    });
  });

  router.get("/api/getUser/:id",auth,(req,res)=>{
    User.findOne({_id:req.params.id},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to get " ,success : false});}
     
            
    console.log(obj);
    res.status(200).json({
                success:true,
                data : obj
            });
    })
});



module.exports = router;