const Vehicle = require('../models/vehicle.model');

const createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    return vehicle;
};

const getVehicles = async () => {
    return await Vehicle.find().populate('owner', 'name email');
};

const getVehicleById = async (id) => {
    return await Vehicle.findById(id).populate('owner', 'name email');
};

const updateVehicle = async (id, updateData) => {
    return await Vehicle.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('owner', 'name email');
};

const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id);
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};