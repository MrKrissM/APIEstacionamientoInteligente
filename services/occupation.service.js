const Occupation = require('../models/occupation.model');
const Vehicle = require('../models/vehicle.model');
const ParkingSpot = require('../models/parkingSpot.model');
const ParkingLot = require('../models/parkingLot.model');

const createOccupation = async (occupationData) => {
    const { vehiclePlate, parkingLotName, parkingSpotNumber } = occupationData;

    // Verificar si ya existe una ocupación activa para esta placa
    const activeOccupation = await Occupation.findOne({
        vehiclePlate,
        status: 'active'
    });

    if (activeOccupation) {
        throw new Error('Este vehículo ya tiene una ocupación activa');
    }

    // Verificar si el vehículo existe, si no, crearlo
    let vehicle = await Vehicle.findOne({ plate: vehiclePlate });
    if (!vehicle) {
        vehicle = new Vehicle({ plate: vehiclePlate });
        await vehicle.save();
    }

    // Verificar si el parking lot existe
    const parkingLot = await ParkingLot.findOne({ name: parkingLotName });
    if (!parkingLot) {
        throw new Error('Parking lot no encontrado');
    }

    // Verificar si el parking spot existe y está disponible
    const parkingSpot = await ParkingSpot.findOne({ parkingLotName, number: parkingSpotNumber });
    if (!parkingSpot) {
        throw new Error('Parking spot no encontrado');
    }

    if (parkingSpot.isOccupied) {
        throw new Error('Este parking spot ya está ocupado');
    }

    // Crear la ocupación
    const occupation = new Occupation({
        parkingLotName,
        parkingSpotNumber,
        vehiclePlate,
        startTime: new Date()
    });

    // Actualizar el estado del parking spot
    parkingSpot.isOccupied = true;

    // Guardar los cambios
    await Promise.all([occupation.save(), parkingSpot.save()]);

    return occupation;
};

const endOccupation = async (id) => {
    const occupation = await Occupation.findById(id);
    if (!occupation || occupation.status === 'completed') {
        throw new Error('Ocupación no encontrada o ya finalizada');
    }

    occupation.endTime = new Date();
    occupation.status = 'completed';

    const parkingSpot = await ParkingSpot.findOne({
        parkingLotName: occupation.parkingLotName,
        number: occupation.parkingSpotNumber
    });

    if (parkingSpot) {
        parkingSpot.isOccupied = false;
        await parkingSpot.save();
    }

    await occupation.save();

    return occupation;
};

const getOccupations = async () => {
    return await Occupation.find();
};

const getActiveOccupations = async () => {
    return await Occupation.find({ status: 'active' });
};

const getOccupationsByVehicle = async (vehiclePlate) => {
    return await Occupation.find({ vehiclePlate });
};

const getOccupationsByParkingLot = async (parkingLotName) => {
    return await Occupation.find({ parkingLotName });
};

const deleteOccupation = async (id) => {
    const occupation = await Occupation.findByIdAndDelete(id);
    return occupation;
};


module.exports = {
    createOccupation,
    endOccupation,
    getOccupations,
    getActiveOccupations,
    getOccupationsByVehicle,
    getOccupationsByParkingLot,
    deleteOccupation
};