const Vehicle = require('../models/vehicle.model');

const createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    return vehicle;
};

const getVehicles = async () => {
    return await Vehicle.find();
};

const getVehicleById = async (id) => {
    return await Vehicle.findById(id);
};

const getVehicleByPlate = async (plate) => {
    return await Vehicle.find({ plate });
};

const updateVehicle = async (id, updateData) => {
    return await Vehicle.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id);
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    getVehicleByPlate,
    updateVehicle,
    deleteVehicle
};