const Vehicle = require('../models/vehicle.model');

const createVehicle = async (vehicleData) => {
    const vehicle = new Vehicle({
        plate: vehicleData.plate,
        model: vehicleData.model || undefined,
        brand: vehicleData.brand || undefined,
        color: vehicleData.color || undefined,
        type: vehicleData.type || undefined
    });
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
    return await Vehicle.findByIdAndUpdate(id, {
        plate: updateData.plate,
        model: updateData.model || undefined,
        brand: updateData.brand || undefined,
        color: updateData.color || undefined,
        type: updateData.type || undefined
    }, { new: true, runValidators: true });
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