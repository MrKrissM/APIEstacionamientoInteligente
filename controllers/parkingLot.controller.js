const { response } = require('express');
const ParkingLot = require('../models/parkingLot.model');
const ParkingSpot = require('../models/parkingSpot.model'); // Añade esta importación
const { createParkingLot, getParkingLots, getParkingLotById, updateParkingLot, deleteParkingLot, getParkingSpotsByLotId } = require('../services/parkingLot.service');

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

const getParkingSpotsByParkingLotController = async (req, res = response) => {
    try {
        const { parkingLot, parkingSpots } = await getParkingSpotsByLotId(req.params.id);
        
        res.status(200).json({
            ok: true,
            parkingLot,
            parkingSpots
        });
    } catch (error) {
        console.error(error);
        if (error.message === 'Parking lot no encontrado') {
            return res.status(404).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los espacios de estacionamiento',
            error: error.message
        });
    }
};

const createSpotsForParkingLotController = async (req, res = response) => {
    try {
        const parkingLot = await ParkingLot.findById(req.params.id);
        if (!parkingLot) {
            return res.status(404).json({
                ok: false,
                msg: 'Parking lot no encontrado'
            });
        }

        const { quantity } = req.body;
        const spotsToCreate = [];
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const spotsPerFloor = Math.ceil(quantity / parkingLot.floors);

        // Obtener el número más alto existente para este parking lot
        const existingSpots = await ParkingSpot.find({ parkingLotName: parkingLot.name })
            .sort({ number: -1 })
            .limit(1);
            
        let lastNumber = 0;
        if (existingSpots.length > 0) {
            const lastSpot = existingSpots[0];
            lastNumber = parseInt(lastSpot.number.replace(/[A-Z]/g, ''));
        }

        for (let floor = 0; floor < parkingLot.floors; floor++) {
            const letraActual = letras[floor];
            for (let spotNum = 1; spotNum <= spotsPerFloor; spotNum++) {
                if (spotsToCreate.length < quantity) {
                    spotsToCreate.push({
                        parkingLotName: parkingLot.name,
                        number: `${letraActual}${lastNumber + spotNum}`,
                        floor: floor + 1,
                        isOccupied: false
                    });
                }
            }
        }

        const newSpots = await ParkingSpot.insertMany(spotsToCreate);
        
        // Actualizar el totalSpots en el parking lot
        parkingLot.totalSpots += quantity;
        await parkingLot.save();

        res.status(201).json({
            ok: true,
            spots: newSpots,
            totalSpots: parkingLot.totalSpots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear espacios',
            error: error.message
        });
    }
};




module.exports = {
    createParkingLotController,
    getParkingLotsController,
    getParkingLotByIdController,
    updateParkingLotController,
    deleteParkingLotController,
    getParkingSpotsByParkingLotController,
    createSpotsForParkingLotController
};