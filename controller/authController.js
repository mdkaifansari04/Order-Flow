
const authentication = require('../midddlewares/userSession')
const Manufacturer = require('../models/ManufacturerSchema')
const Transporter = require('../models/TransporterSchema')
const userSession = require('../midddlewares/userSession')
const bcrypt = require('bcrypt')

//? RENDERING SECTION 

const renderRegistrationPage = (req, res) => {
        let message = req.flash('message')
        let alertMessage = req.flash('alertMessage')

        if (req.session.email) {
                res.render('auth/register', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Logout'
                })
        }
        else {
                res.render('auth/register', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Register'
                })
        }
}

const renderManufacturerLogin = (req, res) => {
        let message = req.flash('message')
        let alertMessage = req.flash('alertMessage')

        if (req.session.email) {
                res.render('auth/manufacturer-login', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Logout'
                })
        }
        else {
                res.render('auth/manufacturer-login', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Register'
                })
        }
}

const renderTransportLogin = (req, res) => {
        let message = req.flash('message')
        let alertMessage = req.flash('alertMessage')

        if (req.session.email) {
                res.render('auth/transporter-login', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Logout'
                })
        }
        else {
                res.render('auth/transporter-login', {
                        message: message,
                        alertMessage: alertMessage,
                        loginOption: 'Register'
                })
        }
}


//? POST REQUEST SECTION OF MANUFACTURER

const registerManufacturer = (req, res) => {

        try {
                if (req.body.password.length >= 8) {
                        bcrypt.hash(req.body.password, 10, async function (err, hash) {

                                const newManufacturer = new Manufacturer({
                                        username: req.body.username,
                                        email: req.body.email,
                                        password: hash,
                                        address: req.body.address
                                })
                                newManufacturer.save()
                                        .then(function () {
                                                userSession(req, res, () => {
                                                        console.log('Middleware call');
                                                })
                                                req.flash('message', 'Registered your account 😛')
                                                res.redirect(`/manufacturer/dashboard`)
                                        })
                                        .catch((error) => {
                                                req.flash('alertMessage', "User Already Exist ! 🙄")
                                                console.log(error);
                                                res.redirect('/auth/register')
                                        })
                        })
                } else {
                        req.flash('alertMessage', "Password must be atleast 8 character long ! ")
                        res.redirect('/auth/register')
                }


        } catch (error) {
                res.send('Server Error : ' + error)
        }
}

//? TRANSPORTER ROUTES ACTIONS

const registerTransporter = async (req, res) => {

        try {
                const foundTransporter = await Transporter.find({})

                if (foundTransporter.length < 0) {
                        if (req.body.password.length >= 8) {
                                bcrypt.hash(req.body.password, 10, async function (err, hash) {
        
                                        const newTransporter = new Transporter({
                                                username: req.body.username,
                                                email: req.body.email,
                                                password: hash,
                                                address: req.body.address
                                        })
                                        await newTransporter.save()
                                                .then(function () {
                                                        userSession(req, res, () => {
                                                                console.log('Middleware call');
                                                        })
                                                        req.flash('message', 'Registered your account 😛')
                                                        res.redirect(`/transporter/dashboard`)
                                                })
                                                .catch((error) => {
                                                        req.flash(`alertMessage', 'User Already Exist ! 🙄`)
                                                        res.redirect('/auth/register')
                                                })
                                })
                        } else {
                                req.flash('alertMessage', "Password must be atleast 8 character long ! ")
                                res.redirect('/auth/register')
                        }
                } else {
                        req.flash('alertMessage', 'Transporter already registered !')
                        res.redirect('/auth/register')
                }


        } catch (error) {
                res.send('Server Error : ' + error)
        }
}


const loginManufacturer = async (req, res) => {

        try {
                const foundManufacturer = await Manufacturer.findOne({ email: req.body.email })
                console.log(foundManufacturer);
                if (foundManufacturer) {
                        bcrypt.compare(req.body.password, foundManufacturer.password).then(function (result) {
                                if (result) {
                                        userSession(req, res, (err) => {
                                                console.log("Session Created");
                                        })
                                        req.flash('message', 'Logged In Successfully 😛')
                                        res.redirect('/manufacturer/dashboard')
                                } else {
                                        req.flash('alertMessage', 'Wrong Credentials')
                                        res.redirect('/auth/manufacturer/login')
                                }
                        });
                } else {
                        req.flash('alertMessage', 'No Such User 🙄')
                        res.redirect('/auth/manufacturer/login')
                }
        } catch (error) {
                res.send('Server Error : ' + error)
        }

}

const loginTransporter = async (req, res) => {

        try {
                const foundTransporter = await Transporter.findOne({ email: req.body.email })
                console.log(foundTransporter);
                
                if (foundTransporter) {
                        bcrypt.compare(req.body.password, foundTransporter.password).then(function (result) {
                                if (result) {
                                        userSession(req, res, (err) => {
                                                console.log("Session Created");
                                        })
                                        req.flash('message', 'Logged In Successfully 😛')
                                        res.redirect('/transporter/dashboard')
                                } else {
                                        req.flash('alertMessage', 'Wrong Credentials ☹️')
                                        res.redirect('/auth/transporter/login')
                                }
                        });
                } else {
                        req.flash('alertMessage', 'No Such User')
                        res.redirect('/auth/transporter/login')
                }
        } catch (error) {
                res.send('Server Error : ' + error)
        }
}

// ? POST REQUEST SECTION OF TRANSPORTER


const logoutUser = (req, res) => {
        req.session.destroy();
        res.redirect('/')
}


module.exports = {
        renderRegistrationPage: renderRegistrationPage,
        renderManufacturerLogin: renderManufacturerLogin,
        renderTransportLogin: renderTransportLogin,
        registerManufacturer: registerManufacturer,
        registerTransporter: registerTransporter,
        logoutUser: logoutUser,
        loginManufacturer: loginManufacturer,
        loginTransporter : loginTransporter
}