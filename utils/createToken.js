const jwt = require('jsonwebtoken');
const {jwt_secret,maxAge} = require('../keys'); 

const createJWTToken = (id)=>{
    return jwt.sign({id},jwt_secret,{
        expiresIn:maxAge
    });
}

module.exports = {createJWTToken};