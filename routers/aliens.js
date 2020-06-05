const express = require('express')
const router = express.Router()
const Aliens = require('../models/alien')
module.exports = router
router.get('/',async(req,res)=>{
    try{
            const aliens = await Aliens.find()
            res.json(aliens)
    }catch(err){
        res.send('Error'+err)
    }
})

