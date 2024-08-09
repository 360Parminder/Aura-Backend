const express = require('express')
const {FetchShowDetails}=require('../controllers/showDetails')

const router= express.Router()


router.get('/showDetails',FetchShowDetails)

module.exports= router