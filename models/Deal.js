const mongoose = require('mongoose');
const {Notify} = require('./Notification');

const dealSchema = new mongoose.Schema({
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
    offering_price:{
        type:Number,
        required:true,
        unique:false,
    },
    contactno:{
        type:Number,
        required:true,
        unique:false,
    },
    adhaar_id:{
        type:Number,
        required:true,
        unique:false,
    }
});


dealSchema.post('save',async (doc,next)=>{
    try{
        const res = await Notify.create({adhaar_id:doc.adhaar_id,doc_id:doc._id,action:'added '+doc.cropname+' deal'});
        console.log(res);
    }
    catch(e){
        console.log(e);
    }  
    next();
});


const Deal =  mongoose.model('deal',dealSchema);

module.exports = {Deal};