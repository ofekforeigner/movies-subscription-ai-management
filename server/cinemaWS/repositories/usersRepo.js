const jf = require('jsonfile')
const User = require('../models/userModel')

const USERS_FILE = 'data/users.json'


const getUsers = () => {
    return jf.readFile(USERS_FILE)
}


// Get All
const getAllUsers = (filters) => {
    return User.find(filters);
};

// Get By ID
const getById = (id) => {
    return User.findById(id);
};

// Create
const addUser = (obj) => {
    console.log('repo');
    
    const u = new User(obj);
    return u.save();
};

// Update
const updateUser = (id, obj) => {
    return User.findByIdAndUpdate(id, obj);
};

// Delete
const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};

// Get by username
const getByUsername = (username) => {
    return User.findOne({ username });
};

module.exports = { getUsers, getAllUsers, getById, addUser, updateUser, deleteUser, getByUsername }