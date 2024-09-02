const ParkingSpot = require('../models/parkingSpot.model');
const ParkingLot = require('../models/parkingLot.model');

const createParkingSpot = async (parkingSpotData) => {
    try {
        // Verificar si el parking lot existe
        const parkingLotExists = await ParkingLot.findOne({ name: parkingSpotData.parkingLotName });
        if (!parkingLotExists) {
            throw new Error('El parking lot especificado no existe');
        }

        // Si el parking lot existe, proceder a crear el parking spot
        const parkingSpot = new ParkingSpot(parkingSpotData);
        await parkingSpot.save();
        return parkingSpot;
    } catch (error) {
        if (error.code === 11000) {
            // Error de duplicado
            throw new Error('Ya existe un parking spot con este número en el mismo parking lot');
        } else {
            // Otros errores
            throw error;
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

const getParkingSpotsByParkingLotName = async (parkingLotName) => {
    try {
        const parkingSpots = await ParkingSpot.find({ parkingLotName });
        return parkingSpots;
    } catch (error) {
        throw new Error('Error al obtener los parking spots: ' + error.message);
    }
};

module.exports = {
    createParkingSpot,
    getParkingSpots,
    getParkingSpotById,
    updateParkingSpot,
    deleteParkingSpot,
    getParkingSpotsByParkingLotName,
    getParkingSpotByLotAndNumber
};