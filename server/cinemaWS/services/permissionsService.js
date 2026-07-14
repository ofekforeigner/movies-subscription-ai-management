const permissionsRepo = require('../repositories/permissionsRepo')
const jf = require('jsonfile')

const PERMISSIONS_FILE = 'data/permissions.json'

const getAll = () => {
    return permissionsRepo.getPermissions();
}

const addPermissions = async (obj) => {
    const { permissions } = await getAll();
    const permissionsObj = { permissions: [...permissions, obj] }
    return permissionsRepo.addPermissions(permissionsObj)
};

const updatePermissions = async (id, obj) => {
    const { permissions } = await getAll();
    const perObj = {
        id,
        permissions: obj
    }
    const index = permissions.findIndex(per => per.id === id)
    permissions[index] = perObj
    const permissionsObj = { permissions }

    return permissionsRepo.updatePermissions(permissionsObj)
};


const deletePermissions = async (id) => {
    const { permissions } = await getAll();

    const index = permissions.findIndex(per => per.id === id)
    permissions.splice(index, 1)
    const permissionsObj = { permissions }
    return await jf.writeFile(PERMISSIONS_FILE, permissionsObj)
};

module.exports = { getAll, addPermissions, updatePermissions, deletePermissions }