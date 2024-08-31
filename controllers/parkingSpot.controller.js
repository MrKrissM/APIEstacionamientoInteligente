const { response } = require('express');
const { createParkingSpot, getParkingSpots, getParkingSpotById, updateParkingSpot, deleteParkingSpot } = require('../services/parkingSpot.service');

const createParkingSpotController = async (req, res = response) => {
    try {
        const parkingSpot = await createParkingSpot(req.body);
        res.status(201).json({
            ok: true,
            parkingSpot
        });
    } catch (error) {
        if (error.message === 'Duplicate parking spot for the same parking lot') {
            res.status(400).json({
                ok: false,
                msg: 'Failed to create parking spot',
                error: error.message
            });
        } else {
            res.status(500).json({
                ok: false,
                msg: 'Failed to create parking spot',
                error: error.message
            });
        }
    }
};

const getParkingSpotsController = async (req, res = response) => {
    try {
        const parkingSpots = await getParkingSpots();
        res.status(200).json({
            ok: true,
            parkingSpots
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to get parking spots',
            error: error.message
        });
    }
};

const getParkingSpotByIdController = async (req, res = response) => {
    try {
        const parkingSpot = await getParkingSpotById(req.params.id);
        if (!parkingSpot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking spot not found'
            });
        }
        res.status(200).json({
            ok: true,
            parkingSpot
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to get parking spot',
            error: error.message
        });
    }
};

const updateParkingSpotController = async (req, res = response) => {
    try {
        const updatedSpot = await updateParkingSpot(req.params.id, req.body);
        res.status(200).json({
            ok: true,
            parkingSpot: updatedSpot
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Failed to update parking spot',
            error: error.message
        });
    }
};

const deleteParkingSpotController = async (req, res = response) => {
    try {
        const deletedSpot = await deleteParkingSpot(req.params.id);
        if (!deletedSpot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking spot not found'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Parking spot deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to delete parking spot',
            error: error.message
        });
    }
};


module.exports = {
    createParkingSpotController,
    getParkingSpotsController,
    getParkingSpotByIdController,
    updateParkingSpotController,
    deleteParkingSpotController
};