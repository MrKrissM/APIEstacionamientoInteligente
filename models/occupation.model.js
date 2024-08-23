const mongoose = require('mongoose');

const OccupationSchema = new mongoose.Schema({
    parkingSpot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpot',
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        maxlength: 100,
        required: true,
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Occupation', OccupationSchema);