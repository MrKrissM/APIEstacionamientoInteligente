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
    floor: {
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

module.exports  = mongoose.model('ParkingSpot', parkingSpotSchema);

