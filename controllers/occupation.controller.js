const { response } = require('express');
const { createOccupation, getOccupations, updateOccupation, getOccupationById, endOccupation, deleteOccupation } = require('../services/occupation.service');

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

const getOccupationByIdController = async (req, res = response) => {
    try {
        const occupation = await getOccupationById(req.params.id);
        if (!occupation) {
            return res.status(404).json({
                ok: false,
                msg: 'occupation not found'
            });
        }
        res.status(200).json({
            ok: true,
            occupation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to get occupation',
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

// Controlador para eliminar una ocupación
const deleteOccupationController = async (req, res = response) => {
    try {
        const occupation = await deleteOccupation(req.params.id);
        if (!occupation) {
            return res.status(404).json({
                ok: false,
                msg: 'Occupation not found'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Occupation deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to delete occupation',
            error: error.message
        });
    }
};

module.exports = {
    createOccupationController,
    getOccupationsController,
    updateOccupationController,
    getOccupationByIdController,
    endOccupationController,
    deleteOccupationController
};