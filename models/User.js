const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    isDealer:{
      type: Boolean,
      unique:false,
    },
    username:{
        type:String,
        minLength:6,
        required:true,
    },
    adhaar_id : {
        type:String,
        length:12,
        unique:true,
        required:true,
    },
    adhaarid:{
        type:String,
        required:false,
        unique:false,
    },
    contactno:{
        type:String,
        length:10,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minLength:6,
        required:true,
        password:true,
    }
    
});

// password encryption here (pre hook)
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(isDealer,adhaar_id,password){
    const user = await this.findOne({adhaar_id,isDealer});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            // auth was successful
            return user;

        } else {   
            throw Error('Incorrect Password Given');
        }
    }
    else{
        throw Error('Incorrect AdhaarId Given');
    }
}


const User = mongoose.model('user',userSchema);

module.exports = User;
