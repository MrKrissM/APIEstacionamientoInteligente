const Occupation = require('../models/occupation.model');

const createOccupation = async (occupationData) => {
    const occupation = new Occupation(occupationData);
    await occupation.save();
    return occupation;
};

const getOccupations = async () => {
    return await Occupation.find();
};

const getOccupationById = async (id) => {
    return await Occupation.findById(id);
};

const updateOccupation = async (id, updateData) => {
    return await Occupation.findByIdAndUpdate(id, updateData, { new: true });
};

const endOccupation = async (id, endTime) => {
    const updatedOccupation = await Occupation.findByIdAndUpdate(
        id,
        { endTime, status: 'completed' },
        { new: true, runValidators: true }
    );

    if (!updatedOccupation) {
        throw new Error('Occupation not found or could not be updated');
    }
    return updatedOccupation;
};

// Función para eliminar una ocupación por ID
const deleteOccupation = async (id) => {
    return await Occupation.findByIdAndDelete(id);
};

module.exports = {
    createOccupation,
    getOccupations,
    getOccupationById,
    updateOccupation,
    endOccupation,
    deleteOccupation
};