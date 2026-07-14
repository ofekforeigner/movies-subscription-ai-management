const axios = require('axios')
const Member = require('../models/memberModel')



const MEMBERS_URL = 'https://jsonplaceholder.typicode.com/users'

const getMembers = () => {
    return axios.get(MEMBERS_URL);
}

// Get All
const getAllMembers = () => {
    return Member.find({});
};

// Get By ID
const getById = (id) => {
    return Member.findById(id);
};

// Create
const addMember = (obj) => {
    const mem = new Member(obj);
    return mem.save();
};

// Update
const updateMember = (id, obj) => {
    return Member.findByIdAndUpdate(id, obj);
};

// Delete
const deleteMember = (id) => {
    console.log(id);
    return Member.findByIdAndDelete(id);
};

module.exports = { getMembers, getAllMembers, getById, addMember, updateMember, deleteMember }