const express =  require('express');
const router = express.Router();
const {Crop} = require('../models/Crop');
const {Deal} = require('../models/Deal');
const {Notify} = require('../models/Notification');
const {crop_errors,deal_errors} = require('../utils/signup_errors');


router.post('/add-crop',async (req,res) => {
    const body = req.body
    console.log(body);
    try{
        const crop = await Crop.create(body);
        res.json({message:crop});

    }
    catch(e){
        console.log(e.message);
        res.json({'err':crop_errors(e.errors)});
    }
    
});

router.post('/add-deal',async (req,res) => {
    const body = req.body
    console.log(body);
    try{
        const deal = await Deal.create(body);
        res.json({message:deal});

    }
    catch(e){
        console.log(e.message);
        res.json({'err':deal_errors(e.errors)});
    }
    
});


router.get('/get-notifications',async (req,res)=>{
    try{
        const _res = await Notify.find({});
        res.json({'notifications':_res});
    }
    catch(e){
        res.json({e:e});
    }
});


router.post('/get-my-crops',async (req,res)=>{
    const {adhaar_id} = req.body;
    try{
        const yourcrops = await Crop.find({adhaar_id});
        res.json({'crops':yourcrops});
    }
    catch(e){
        res.status(404).json({e});
    }
});

router.post('/get-my-deals',async (req,res)=>{
    const {adhaar_id} = req.body;
    try{
        const yourdeals = await Deal.find({adhaar_id});
        res.json({'deals':yourdeals});
    }
    catch(e){
        res.status(404).json({e});
    }
});


router.post('/get-crop-view',async (req,res)=>{
    const {crop_id} = req.body;
    try{
        const _res = await Crop.findById(crop_id);
        res.json({'crop':_res});
    } catch(e) {
        res.json({e});
    }
});


router.post('/get-crop-count',async (req,res)=>{
    const {adhaar_id} = req.body;
    try{
        const count = await Crop.countDocuments({adhaar_id});
        res.json({count});
    } catch(e) {
        res.json({e});
    }
});


router.post('/get-deal-count',async (req,res)=>{
    const {adhaar_id} = req.body;
    try{
        const count = await Deal.countDocuments({adhaar_id});
        res.json({count});
    } catch(e) {
        res.json({e});
    }
});


module.exports.ModelRoutes = router;