const mongoose = require('mongoose');

const OccupationSchema = new mongoose.Schema({
    parkingLotName: {
        type: String,
        required: true
    },
    parkingSpotNumber: {
        type: Number,
        required: true
    },
    vehiclePlate: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        required: true,
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Occupation', OccupationSchema);