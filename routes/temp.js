const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Sensor = mongoose.model('Sensor');
const requirelogin = require('../middleware/auth');
router.post("/receive_temperature",requirelogin,(req,res)=>{
    const {sensor_name, temperature, time} = req.body;

    console.log(temperature);
    console.log(time);
    if(!sensor_name || !temperature || !time){
        return res.status(401).json({error: "add1 sensor name and temperature"});
    }
    const sensor  = new Sensor({
        sensor_name : sensor_name,
        temperature : temperature,
        time : time
    })
    sensor.save()
    .then(result=>{
        res.json({data:result});
    })
    .catch(err=>{
        console.log(err);
    })
  });
  router.post("/access_temperature",requirelogin,(req,res)=>{
    const {sensor_name} = req.body;
    if(!sensor_name){
        return res.status(401).json({error: "add sensor name"});
    }
    Sensor.find({sensor_name : sensor_name})
    .then(data=>{
        res.json({data:data});
    })
    .catch(err=>{
       console.log(err);
    })
  });
  module.exports = router;