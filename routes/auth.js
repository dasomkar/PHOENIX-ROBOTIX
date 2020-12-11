const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const {JWT_SECRET} = require('../server/keys');


router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    if(!email || !password || !name){
       return res.status(422).json({error: "please add all fields"});
    }
    User.findOne({email:email})
    //saved user==user with this email
    .then((SavedUser)=>{
       if(SavedUser){
         return res.status(422).json({error:  "this email is already exit"});
       }
       bcrypt.hash(password,12)
       .then(hashedpassword=>{
            const user = new User({
              email: email,
              password:hashedpassword,
              name: name,
            })
            user.save()
            .then(user=>{
              res.json({message: "saved successfully"});
            })
            .catch(err=>{
              console.log(err);
            })
       })
  
    })
    .catch(err=>{
      console.log(err);
    })
});
router.post('/signin',(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
      return res.status(422).jason({error: "please add email or password"});
  }
  User.findOne({email:email})
  .then(saveduser=>{
    if(!saveduser){
      return res.status(422).json({error:"invalid email or password"});
    }
    bcrypt.compare(password,saveduser.password)
    .then(domatch=>{
      if(domatch){
        //res.json({message: "successfully signenin"});
        const token = jwt.sign({_id:saveduser._id},JWT_SECRET);
        const {_id,name,email} = saveduser;
        res.json({token:token,user:{_id:_id,name:name,email:email}});
       
      }else{
        return res.status(422).json({error: "invslid email or password"});
      }
    })
    .catch(err=>{
      console.log(err);
    })
 
    
  })
  .catch(err=>{
    console.log(err);
  })
 });
module.exports = router;