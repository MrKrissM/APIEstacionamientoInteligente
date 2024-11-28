const { response } = require('express');
const { createVehicle, getVehicles, getVehicleById, getVehicleByPlate, updateVehicle, deleteVehicle } = require('../services/vehicle.service');

const createVehicleController = async (req, res = response) => {     
    try {         
      const vehicle = await createVehicle(req.body);         
      res.status(201).json({             
        ok: true,             
        data: [vehicle]  // Mantén el formato de respuesta
      });     
    } catch (error) {         
      console.error(error);         
      res.status(500).json({             
        ok: false,             
        msg: 'Failed to create vehicle',             
        error: error.message         
      });     
    } 
};

const getVehiclesController = async (req, res = response) => {
    try {
        const vehicles = await getVehicles();
        res.status(200).json({
            ok: true,
            vehicles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to get vehicles',
            error: error.message
        });
    }
};

const getVehicleByIdController = async (req, res = response) => {
    try {
        const vehicle = await getVehicleById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehicle not found'
            });
        }
        res.status(200).json({
            ok: true,
            vehicle
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to get vehicle',
            error: error.message
        });
    }
};

const getVehicleByPlateController = async (req, res = response) => {
    try {
        const plateVehicle = await getVehicleByPlate(req.params.plate);
        res.status(200).json({
            ok: true,
            plateVehicle
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error to get plate from Vehicle'
        });
    }
};

const updateVehicleController = async (req, res = response) => {
    try {
        const updatedVehicle = await updateVehicle(req.params.id, req.body);
        if (!updatedVehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehicle not found'
            });
        }
        res.status(200).json({
            ok: true,
            data: [updatedVehicle]  // Asegúrate de enviar en formato de array
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to update vehicle',
            error: error.message
        });
    }
};
const deleteVehicleController = async (req, res = response) => {
    try {
        const deletedVehicle = await deleteVehicle(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehicle not found'
            });
        }
        res.status(200).json({
            ok: true,
            id: deletedVehicle._id,  // Devuelve el ID
            msg: 'Vehicle deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to delete vehicle',
            error: error.message
        });
    }
};

module.exports = {
    createVehicleController,
    getVehiclesController,
    getVehicleByPlateController,
    getVehicleByIdController,
    updateVehicleController,
    deleteVehicleController
};