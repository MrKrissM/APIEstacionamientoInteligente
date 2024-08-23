const Occupation = require('../models/occupation.model');

const createOccupation = async (occupationData) => {
    const occupation = new Occupation(occupationData);
    await occupation.save();
    return occupation;
};

const getOccupations = async () => {
    return await Occupation.find().populate('parkingSpot Vehicle');
};

const getOccupationById = async (id) => {
    return await Occupation.findById(id).populate('parkingSpot vehicle');
};

const updateOccupation = async (id, updateData) => {
    return await Occupation.findByIdAndUpdate(id, updateData, { new: true });
};

const endOccupation = async (id, endTime) => {
    return await Occupation.findByIdAndUpdate(id, { endTime, status: 'completed' }, { new: true });
};

module.exports = {
    createOccupation,
    getOccupations,
    updateOccupation,
    endOccupation
};