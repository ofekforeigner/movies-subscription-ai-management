const jf = require('jsonfile')

const PERMISSIONS_FILE = 'data/permissions.json'

const getPermissions = () => {
    return jf.readFile(PERMISSIONS_FILE);
}

const addPermissions = (obj) => {
    return jf.writeFile(PERMISSIONS_FILE, obj);
}

const updatePermissions = (obj) => {
    return jf.writeFile(PERMISSIONS_FILE, obj);
}

const deletePermissions = () => {
    return jf.writeFile(PERMISSIONS_FILE, obj);
}

module.exports = { getPermissions, addPermissions, updatePermissions, deletePermissions }