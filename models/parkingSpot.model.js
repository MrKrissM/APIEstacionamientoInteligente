const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
    parkingLotName: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

parkingSpotSchema.index({ parkingLotName: 1, number: 1 }, { unique: true });

const ParkingSpot = mongoose.model('ParkingSpot', parkingSpotSchema);

module.exports = ParkingSpot;