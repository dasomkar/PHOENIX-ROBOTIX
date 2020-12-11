const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const sensorSchema = new mongoose.Schema({
    sensor_name:{
        type: String,
        required: true
    },
    temperature:{
        type: String,
        required: true
    },
    time:{
        type : String,
        required : true
    }

})
mongoose.model("Sensor",sensorSchema);