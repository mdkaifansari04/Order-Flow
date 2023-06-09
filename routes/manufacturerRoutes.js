const express = require('express')
const router = express.Router()

const { renderManufacturerDashboard,
    renderProductView,
    renderCreateTransportPage, 
    sendMessageToTransporter, 
    deleteMessage, 
    getMessageByOrderID
    } = require('../controller/manufacturerController')


//* GET REQUEST ROUTES 
router.get('/dashboard', renderManufacturerDashboard)
router.get('/dashboard/createTransport', renderCreateTransportPage)
router.get('/dashboard/view/:id', renderProductView)
router.get('/dashboard/getMessage', getMessageByOrderID)


//* POST REQUEST ROUTES 
router.post('/dashboard/createTransport', sendMessageToTransporter)

//* DELETE REQUEST ROUTES 
router.delete('/dashboard/message/delete/:id', deleteMessage)

module.exports = router;