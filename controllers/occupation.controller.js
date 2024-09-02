const { response } = require('express');
const {
    createOccupation,
    endOccupation,
    getOccupations,
    getActiveOccupations,
    getOccupationsByVehicle,
    getOccupationsByParkingLot,
    deleteOccupation
} = require('../services/occupation.service');

const createOccupationController = async (req, res = response) => {
    try {
        const occupation = await createOccupation(req.body);
        res.status(201).json({
            ok: true,
            occupation
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error.message
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

const getActiveOccupationsController = async (req, res = response) => {
    try {
        const occupations = await getActiveOccupations();
        res.status(200).json({
            ok: true,
            occupations
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las ocupaciones activas'
        });
    }
};

const getOccupationsByVehicleController = async (req, res = response) => {
    try {
        const occupations = await getOccupationsByVehicle(req.params.plate);
        res.status(200).json({
            ok: true,
            occupations
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las ocupaciones del vehículo'
        });
    }
};

const getOccupationsByParkingLotController = async (req, res = response) => {
    try {
        const occupations = await getOccupationsByParkingLot(req.params.name);
        res.status(200).json({
            ok: true,
            occupations
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las ocupaciones del parking lot'
        });
    }
};

const endOccupationController = async (req, res = response) => {
    try {
        const occupation = await endOccupation(req.params.id);
        res.status(200).json({
            ok: true,
            occupation
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
};

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
    getActiveOccupationsController,
    getOccupationsByVehicleController,
    getOccupationsByParkingLotController,
    endOccupationController,
    deleteOccupationController
};