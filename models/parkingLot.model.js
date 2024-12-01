// models/parkingLot.model.js
const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    floors: {
        type: Number,
        required: true
    },
    totalSpots: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);