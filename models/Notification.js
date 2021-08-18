const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    
    adhaar_id:{
        type:Number,
        length:12,
        required:true,
        unique:false,
    },
    action:{
        type:String,
        required:true,
        unique:false,
    },
    doc_id:{
        type:String,
        required:true,
        unique:true,
    }
});


const Notify = mongoose.model('notification',notificationSchema);

module.exports = {Notify};