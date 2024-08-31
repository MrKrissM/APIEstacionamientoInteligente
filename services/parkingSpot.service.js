const ParkingSpot = require('../models/parkingSpot.model');

const createParkingSpot = async (parkingSpotData) => {
    try {
        const parkingSpot = new ParkingSpot(parkingSpotData);
        await parkingSpot.save();
        return parkingSpot;
    } catch (error) {
        if (error.code === 11000) {
            // Error de duplicado
            throw new Error('Duplicate parking spot for the same parking lot');
        } else {
            // Otros errores
            throw new Error(error.message);
        }
    }
};

const getParkingSpots = async () => {
    return await ParkingSpot.find();
};

const getParkingSpotById = async (id) => {
    return await ParkingSpot.findById(id);
};

const updateParkingSpot = async (id, updateData) => {
    return await ParkingSpot.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteParkingSpot = async (id) => {
    return await ParkingSpot.findByIdAndDelete(id);
};

const getParkingSpotByLotAndNumber = async (parkingLotName, number) => {
    return await ParkingSpot.findOne({ parkingLotName, number });
};

module.exports = {
    createParkingSpot,
    getParkingSpots,
    getParkingSpotById,
    updateParkingSpot,
    deleteParkingSpot,
    getParkingSpotByLotAndNumber
};