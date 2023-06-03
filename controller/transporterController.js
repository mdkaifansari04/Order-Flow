
const ManufacturerMessage = require('../models/ManufacturerMessageSchema')
const TransporterMessage = require('../models/TransporterMessageSchema')


const renderTransportDashboard = async (req, res) => {
    let message = req.flash('message')
    let alertMessage = req.flash('alertMassage')

    const foundManufacturerMessage = await ManufacturerMessage.find({})

    if (req.session.email && req.session.user == 'transporter') {
        res.render('transporter/dashboard', {
            message: message,
            alertMessage: alertMessage,
            loginOption: 'Logout',
            messages: foundManufacturerMessage,
        })
    }
    else {
        res.redirect('/auth/transporter/login')
    }
}


const renderTransporterProductView = async (req, res) => {
    let message = req.flash('message')
    let alertMessage = req.flash('alertMassage')

    if (req.session.email && req.session.user == 'transporter') {

        const foundMessage = await ManufacturerMessage.findOne({ _id: req.params.id })

        res.render('transporter/productView', {
            message: message,
            alertMessage: alertMessage,
            loginOption: 'Logout',
            message: foundMessage,
        })
    }
    else {
        res.redirect('/auth/transporter/login')
    }
}

const sendMessageToManufacturer = async (req, res) => {
    try {
        const foundMessage = await ManufacturerMessage.findOne({ _id: req.params.id })

        const newTransporterMessage = TransporterMessage({
            orderID: foundMessage.orderID,
            to: foundMessage.to,
            from: foundMessage.from,
            quantity: foundMessage.quantity,
            address: foundMessage.address,
            reply: req.body.reply,
            price: req.body.price,
        })
        newTransporterMessage.save()
            .then(() => {
                req.flash('message', 'Send Message Successfully')
                res.redirect('/transporter/dashboard')
            })
            .catch((err) => {
                req.flash('alertMessage', 'Error Occured, Try again !')
                res.redirect('/transporter/dashboard')
            })
    } catch (error) {
        res.send('Server Error : ' + error)
    }
}

const deleteManufacturerMessage = async (req, res) => {
    try {
        await ManufacturerMessage.deleteOne({ _id: req.params.id })
            .then(() => {
                req.flash('message', 'Deleted Successfully 😛')
                res.redirect('/transporter/dashboard')
            })
            .catch((err) => {
                console.log(err);
                req.flash('alertMessage', 'Something went wrong, Try again ! 🙄')
                res.redirect('/transporter/dashboard')
            })
    } catch (error) {
        res.send('Server Error : ' + error)
    }
}

const getMessageByOrderID = async (req, res) => {

    try {
        let message = req.flash('message')
        let alertMessage = req.flash('alertMessage')

        const foundMessage = await ManufacturerMessage.find({ orderID: req.query.search })
        console.log((foundMessage));

        if (req.session.email && req.session.user == 'transporter') {
            res.render('transporter/dashboard', {
                message: message,
                alertMessage: alertMessage,
                loginOption: "Logout",
                messages: foundMessage
            })
        } else {
            res.redirect('/auth/transporter/login')
        }
    } catch (error) {
        res.send('Server Error : ' + error)
    }
}


module.exports = {
    renderTransportDashboard: renderTransportDashboard,
    renderTransporterProductView: renderTransporterProductView,
    sendMessageToManufacturer: sendMessageToManufacturer,
    deleteManufacturerMessage : deleteManufacturerMessage,
    getMessageByOrderID : getMessageByOrderID
}