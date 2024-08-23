const ParkingSpot = require('../models/parkingSpot.model');

const createParkingSpot = async (parkingSpotData) => {
    const parkingSpot = new ParkingSpot(parkingSpotData);
    await parkingSpot.save();
    return parkingSpot;
};

const getParkingSpots = async () => {
    return await ParkingSpot.find().populate('parkingLot');
};

const getParkingSpotById = async (id) => {
    return await ParkingSpot.findById(id).populate('parkingLot');
};

const updateParkingSpot = async (id, updateData) => {
    return await ParkingSpot.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

module.exports = {
    createParkingSpot,
    getParkingSpots,
    getParkingSpotById,
    updateParkingSpot
};