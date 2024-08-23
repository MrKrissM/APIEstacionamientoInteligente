const ParkingLot = require('../models/parkingLot.model');

const createParkingLot = async (parkingLotData) => {
    const parkingLot = new ParkingLot(parkingLotData);
    await parkingLot.save();
    return parkingLot;
};

const getParkingLots = async () => {
    return await ParkingLot.find();
};

const getParkingLotById = async (id) => {
    return await ParkingLot.findById(id);
};

const updateParkingLot = async (id, updateData) => {
    return await ParkingLot.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteParkingLot = async (id) => {
    return await ParkingLot.findByIdAndDelete(id);
};

module.exports = {
    createParkingLot,
    getParkingLots,
    getParkingLotById,
    updateParkingLot,
    deleteParkingLot
};