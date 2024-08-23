const { response } = require('express');
const { createOccupation, getOccupations, updateOccupation, endOccupation } = require('../services/occupation.service');

const createOccupationController = async (req, res = response) => {
    try {
        const occupation = await createOccupation(req.body);
        res.status(201).json({
            ok: true,
            occupation
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to create occupation',
            error: error.message
        });
    }
};

const getOccupationsController = async (req, res = response) => {
    try {
        const occupations = await getOccupations();
        res.status(200).json({
            ok: true,
            occupations
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to get occupations',
            error: error.message
        });
    }
};

const updateOccupationController = async (req, res = response) => {
    try {
        const updatedOccupation = await updateOccupation(req.params.id, req.body);
        res.status(200).json({
            ok: true,
            occupation: updatedOccupation
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to update occupation',
            error: error.message
        });
    }
};

const endOccupationController = async (req, res = response) => {
    try {
        const endedOccupation = await endOccupation(req.params.id, req.body.endTime);
        res.status(200).json({
            ok: true,
            occupation: endedOccupation
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to end occupation',
            error: error.message
        });
    }
};

module.exports = {
    createOccupationController,
    getOccupationsController,
    updateOccupationController,
    endOccupationController
};