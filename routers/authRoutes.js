const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {make_signup_errors} = require('../utils/signup_errors');
const {createJWTToken} = require('../utils/createToken');
const {maxAge} = require('../keys');
const jwtDecode = require('jwt-decode');

router.post('/signup',async (req,res)=>{
    console.log(req.body);
    try{
        const user = await User.create(req.body);
        const token = createJWTToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*maxAge});
        res.status(201).json({user:user});
    } catch(e) {
        if('errors' in e){
            res.json({err:{'rules':make_signup_errors(e.errors)}});
        }
        else{
            res.json({'err':{'mongo_error':e}});
        }
    } 
});

router.post('/login',async (req,res)=>{
    const {isDealer,adhaar_id,password} = req.body;
    try{
        const user = await User.login(isDealer,adhaar_id,password);
        const token = await createJWTToken(user._id);
        res.cookie('jwt',token,{maxAge:1000*maxAge,httpOnly:true});
        res.status(200).json({'message':'login Successfull'});
    }
    catch(e){
        res.json({'error':e.message})
    }
});

router.get('/logout',async (req,res)=>{
    await res.cookie('jwt',{maxAge:1});
    res.status(200).json({'message':'logout Successfull'});
});


router.get('/getAuthState',async (req,res)=>{
    const  token = await req.cookies['jwt'];
    if(token){
        try{
            const tokenData = await jwtDecode(token);
            const user = await User.findById(tokenData.id);
            res.status(200).json({user});
        }
        catch(e){
            res.status(404).json({message:'user not found'});
        }
        
    }
    else{
        res.status(404).json({message:'user not found'});
    }
    
});


module.exports.AuthRoutes = router;
