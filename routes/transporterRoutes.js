const express = require('express')
const router = express.Router()
const {renderTransportDashboard, renderTransporterProductView, sendMessageToManufacturer, deleteManufacturerMessage , getMessageByOrderID} = require('../controller/transporterController')


//* GET REQUEST ROUTERS 
router.get('/dashboard', renderTransportDashboard);
router.get('/dashboard/view/:id', renderTransporterProductView)
router.get('/dashboard/getMessage', getMessageByOrderID)


//* POST REQUEST ROUTERS 
router.post('/dashboard/view/sendMessage/:id', sendMessageToManufacturer )

//* DELETE REQUEST ROUTERS 
router.delete('/dashboard/message/delete/:id', deleteManufacturerMessage )


module.exports = router;