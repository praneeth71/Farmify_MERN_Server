const mongoose = require('mongoose');
const {Notify} = require('./Notification');


const cropSchema = new mongoose.Schema({
    cropname:{
        type: String,
        required: true,
        unique:false,
        minLength:4,
    },
    quantity:{
        type:Number,
        required:true,
        unique:false,
    },
    units:{
        type: String,
        required:true,
        unique:false,
    },
    expected_price:{
        type:Number,
        required:true,
        unique:false,
    },
    contactno:{
        type:Number,
        required:true,
        unique:false,
        maxLength:10,
        minLength:10
    },
    adhaar_id:{
        type:Number,
        required:true,
        unique:false,
        length:12,
    }
});


cropSchema.post('save',async (doc,next)=>{
    try{
        
        const res = await Notify.create({adhaar_id:doc.adhaar_id,doc_id:doc._id,action:'added '+doc.cropname+' crop'});
        console.log(res);
    }
    catch(e){
        console.log(e);
    }  
    next();
});

const Crop =  mongoose.model('crop',cropSchema);

module.exports = {Crop};