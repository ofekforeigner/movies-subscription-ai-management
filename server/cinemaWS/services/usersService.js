const usersRepo = require('../repositories/usersRepo')
const permissionsService = require('../services/permissionsService')
const jf = require('jsonfile')

const USERS_FILE = 'data/users.json'


const getAll = async () => {
    const { users: usersJson } = await usersRepo.getUsers();
    const { permissions } = await permissionsService.getAll();
    const usersData = []

    for (const i in usersJson) {
        const obj = {
            id: usersJson[i].id,
            first_name: usersJson[i].first_name,
            last_name: usersJson[i].last_name,
            session_timeout: usersJson[i].session_timeout,
            created_date: usersJson[i].created_date
        };


        const userDB = await usersRepo.getById(usersJson[i].id);
        
        obj.username = userDB?.username

        const userPermissions = permissions.find((per) => per.id === usersJson[i].id);
        obj.permissions = userPermissions.permissions;
        usersData.push(obj);
    }

    return usersData;
}

const getById = (id) => {
    return usersRepo.getById(id);
};

const addUser = async (obj) => {
    console.log("herere", obj);
    
    const { users } = await usersRepo.getUsers();
    const newUserDb = await usersRepo.addUser({ username: obj.username, password: '' });

    const userObj = {
        id: newUserDb._id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        username: obj.username,
        session_timeout: obj.session_timeout,
        created_date: obj.created_date
    }

    const usersObj = { users: [...users, userObj] }

    await jf.writeFile(USERS_FILE, usersObj)
    await permissionsService.addPermissions({ id: newUserDb._id, permissions: obj.permissions })
    return newUserDb
};

const updateUser = async (id, obj) => {
    const { users } = await usersRepo.getUsers();
    const userObj = {
        id: obj.id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        username: obj.username,
        session_timeout: obj.session_timeout,
        created_date: obj.created_date
    }
    const index = users.findIndex(u => u.id === id)
    users[index] = userObj
    const usersObj = { users }
    await jf.writeFile(USERS_FILE, usersObj)
    await permissionsService.updatePermissions(id, obj.permissions)

    return usersRepo.updateUser(id, obj);
};

const deleteUser = async (id) => {
    const { users } = await usersRepo.getUsers();
    const index = users.findIndex(u => u.id === id)
    users.splice(index, 1)
    const usersObj = { users }

    await jf.writeFile(USERS_FILE, usersObj)
    await permissionsService.deletePermissions(id);

    return usersRepo.deleteUser(id);
};

const updateUserPassword = (id, obj) => {
    return usersRepo.updateUser(id, obj);
};

const getByUsername = (username) => {
    return usersRepo.getByUsername(username);
};

const getUser = (filter) => {
    return usersRepo.getAllUsers(filter);
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser, updateUserPassword, getByUsername, getUser }