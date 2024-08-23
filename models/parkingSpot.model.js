const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
    parkingLot: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ParkingLot',
        required: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    },
    vehicle: {
        type: String,
        default: null,
        maxlength: 100
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);