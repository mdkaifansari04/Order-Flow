// Message Schema for Manufacturer
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    transporter: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ManufacturerMessage = mongoose.model('ManufacturerMessage', messageSchema);

module.exports = ManufacturerMessage;
