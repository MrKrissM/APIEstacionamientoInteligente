const ParkingLot = require('../models/parkingLot.model');
const ParkingSpot = require('../models/parkingSpot.model');

// En parkingLot.service.js
const createParkingLot = async (parkingLotData) => {
    const parkingLot = new ParkingLot(parkingLotData);
    await parkingLot.save();

    // Crear spots automáticamente
    const spotsToCreate = [];
    const spotsPerFloor = Math.ceil(parkingLot.totalSpots / parkingLot.floors);

    for (let floor = 1; floor <= parkingLot.floors; floor++) {
        for (let spotNum = 1; spotNum <= spotsPerFloor; spotNum++) {
            if (spotsToCreate.length < parkingLot.totalSpots) {
                spotsToCreate.push({
                    parkingLotName: parkingLot.name,
                    number: spotsToCreate.length + 1,
                    floor,
                    isOccupied: false
                });
            }
        }
    }

    await ParkingSpot.insertMany(spotsToCreate);

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

const getParkingSpotsByLotId = async (parkingLotId) => {
    // Primero obtenemos el parking lot
    const parkingLot = await ParkingLot.findById(parkingLotId);
    if (!parkingLot) {
        throw new Error('Parking lot no encontrado');
    }

    // Luego obtenemos sus spots
    const parkingSpots = await ParkingSpot.find({ parkingLotName: parkingLot.name });
    return { parkingLot, parkingSpots };
};

module.exports = {
    createParkingLot,
    getParkingLots,
    getParkingLotById,
    updateParkingLot,
    deleteParkingLot,
    getParkingSpotsByLotId
};