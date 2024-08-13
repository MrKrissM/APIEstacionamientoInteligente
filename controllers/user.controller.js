const { response } = require('express');
const { createUser, getUsers } = require('../services/user.service');

const createUserController = async (req, res = response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            ok: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Create user failed'
        });
    }
};

const getUserController = async (req, res = response) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            ok: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Get users failed'
        });
    }
};

module.exports = {
    createUserController,
    getUserController
}