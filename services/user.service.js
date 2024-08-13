const { model } = require('mongoose');
const User = require('../models/user.model');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const getUsers = async() => {
    return await User.find({}, 'name email');
}

module.exports = {
    createUser,
    getUsers
}