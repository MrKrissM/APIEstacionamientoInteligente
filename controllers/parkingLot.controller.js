const { response } = require('express');
const { createParkingLot, getParkingLots, getParkingLotById, updateParkingLot, deleteParkingLot } = require('../services/parkingLot.service');

const createParkingLotController = async (req, res = response) => {
    try {
        const parkingLot = await createParkingLot(req.body);
        res.status(201).json({
            ok: true,
            parkingLot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to create parking lot',
            error: error.message
        });
    }
};

const getParkingLotsController = async (req, res = response) => {
    try {
        const parkingLots = await getParkingLots();
        res.status(200).json({
            ok: true,
            parkingLots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to get parking lots',
            error: error.message
        });
    }
};

const getParkingLotByIdController = async (req, res = response) => {
    try {
        const parkingLot = await getParkingLotById(req.params.id);
        if (!parkingLot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking lot not found'
            });
        }
        res.status(200).json({
            ok: true,
            parkingLot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to get parking lot',
            error: error.message
        });
    }
};

const updateParkingLotController = async (req, res = response) => {
    try {
        const updatedParkingLot = await updateParkingLot(req.params.id, req.body);
        if (!updatedParkingLot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking lot not found'
            });
        }
        res.status(200).json({
            ok: true,
            parkingLot: updatedParkingLot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to update parking lot',
            error: error.message
        });
    }
};

const deleteParkingLotController = async (req, res = response) => {
    try {
        const deletedParkingLot = await deleteParkingLot(req.params.id);
        if (!deletedParkingLot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking lot not found'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Parking lot deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to delete parking lot',
            error: error.message
        });
    }
};

module.exports = {
    createParkingLotController,
    getParkingLotsController,
    getParkingLotByIdController,
    updateParkingLotController,
    deleteParkingLotController
};