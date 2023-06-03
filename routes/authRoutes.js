const express = require('express')
const router = express.Router()


const Manufacturer = require('../models/ManufacturerSchema')
const Transporter = require('../models/TransporterSchema')

//* CONTROLLERS 
const { renderRegistrationPage,
        renderManufacturerLogin,
        renderTransportLogin,
        registerManufacturer,
        registerTransporter,
        logoutUser,
        loginManufacturer,
        loginTransporter }
        = require('../controller/authController')


router.get('/register', renderRegistrationPage)

router.get('/manufacturer/login', renderManufacturerLogin)
router.get('/transporter/login', renderTransportLogin)

router.get('/Logout', logoutUser)

//?FOR SIGNUP 
router.post('/manufacturer/register', registerManufacturer)
router.post('/transporter/register', registerTransporter)

//?FOR LOGIN
router.post('/manufacturer/login', loginManufacturer)
router.post('/transporter/login', loginTransporter)

module.exports = router;