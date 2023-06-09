const Manufacturer = require('../models/ManufacturerSchema')
const ManufacturerMessage = require('../models/ManufacturerMessageSchema')
const TransporterMessage = require('../models/TransporterMessageSchema')



const renderManufacturerDashboard = async (req, res) => {
    let message = req.flash('message')
    let alertMessage = req.flash('alertMassage')


    const foundTransporterMessages = await TransporterMessage.find({email : req.session.email})

    if (req.session.email  && req.session.user == 'manufacturer') {
        res.render('manufacturer/dashboard', {
            message: message,
            alertMessage: alertMessage,
            loginOption: "Logout",
            messages: foundTransporterMessages
        })

    } else {
        res.redirect('/auth/manufacturer/login')
    }
}

const renderProductView = async (req, res) => {
    let message = req.flash('message')
    let alertMessage = req.flash('alertMassage')

    const receivedTransporterMessage = await TransporterMessage.findOne({ _id: req.params.id })
    console.log(receivedTransporterMessage);


    if (req.session.email  && req.session.user == 'manufacturer') {
        res.render('manufacturer/productView', {
            message: message,
            alertMessage: alertMessage,
            loginOption: 'Logout',
            message: receivedTransporterMessage
        })
    }
    else {
        res.redirect('/auth/manufacturer/login')
    }
}

const renderCreateTransportPage = (req, res) => {

    let message = req.flash('message')
    let alertMessage = req.flash('alertMassage')

    if (req.session.email  && req.session.user == 'manufacturer') {
        res.render('manufacturer/createTransportRequest', {
            message: message,
            alertMessage: alertMessage,
            loginOption: 'Logout'
        })
    }
    else {
        res.redirect('/auth/manufacturer/login')
    }
}


const sendMessageToTransporter = async (req, res) => {

    try {

        function generateAlphanumericCode(length) {
            let alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            let flag = 0;

            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * alphanumeric.length);
                code += alphanumeric.charAt(randomIndex);
            }
            flag++;
            return code + flag;
        }
        let newOrderID = generateAlphanumericCode(5);
        let foundManufacturer = await Manufacturer.findOne({ email: req.session.email })

        let newTransportMessage = new ManufacturerMessage({
            orderID: newOrderID,
            to: req.body.to,
            from: req.body.from,
            quantity: req.body.quantity,
            address: foundManufacturer.address,
            transporter: req.body.transporter,
            email : req.session.email,
        })

        newTransportMessage.save()
            .then(() => {
                console.log(newTransportMessage);
                req.flash('message', 'Export Product Successfully 😊')
                res.redirect('/manufacturer/dashboard/createTransport')
            })
            .catch((err) => {
                console.log(err);
                req.flash('alertMessage', 'Something went wrong, Please try again 🙄')
                res.redirect('/manufacturer/dashboard/createTransport')
            })
    } catch (err) {
        res.send('Server Error: ' + err)
    }
}


const deleteMessage = async (req, res) => {
    try {
        await TransporterMessage.deleteOne({ _id: req.params.id })
            .then(() => {
                req.flash('message', 'Deleted Successfully 😊')
                res.redirect('/manufacturer/dashboard')
            })
            .catch((err) => {
                req.flash('alertMessage', 'Something went wrong, Try again ! 🙄')
                res.redirect('/manufacturer/dashboard')
            })

    } catch (error) {
        res.send('Server Error : ' + error)
    }
}

const getMessageByOrderID = async (req, res) => {

    try {
        let message = req.flash('message')
        let alertMessage = req.flash('alertMessage')
        console.log("Check 1");

        const foundMessage = await TransporterMessage.find({ orderID: req.query.search })
        console.log((foundMessage));

        if (req.session.email && req.session.user == 'manufacturer') {
            res.render('manufacturer/dashboard', {
                message: message,
                alertMessage: alertMessage,
                loginOption: "Logout",
                messages: foundMessage
            })
        } else {
            res.redirect('/auth/manufacturer/login')
        }
    } catch (error) {
        res.send('Server Error : ' + error)
    }
}

module.exports = {
    renderManufacturerDashboard: renderManufacturerDashboard,
    renderProductView: renderProductView,
    renderCreateTransportPage: renderCreateTransportPage,
    sendMessageToTransporter: sendMessageToTransporter,
    deleteMessage: deleteMessage,
    getMessageByOrderID: getMessageByOrderID
}