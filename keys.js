
const mongoUrl = 'mongodb://localhost:27017/centralData';
const jwt_secret = 'farmify';
const maxAge = 3*24*60*60; // 3 days
module.exports = {mongoUrl,jwt_secret,maxAge};