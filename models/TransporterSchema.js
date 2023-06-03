// Transporter Schema
const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address : {
        type : String,
        require : true
    }
});

const Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
