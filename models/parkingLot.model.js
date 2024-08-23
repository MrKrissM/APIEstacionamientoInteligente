const mongoose = require('mongoose');

const ParkingLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    address: {
        type: String,
        required: true,
        maxlength: 255
    },
    floors:
    {
        type: Number,
        required: true
    },
    totalSpots:
    {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('ParkingLot', ParkingLotSchema);