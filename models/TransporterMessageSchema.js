// Message Schema for Transporter
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    to : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required : true
    },
    quantity : {
        type: Number,
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required : true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const TransporterMessage = mongoose.model('TransporterMessage', messageSchema);

module.exports = TransporterMessage;
