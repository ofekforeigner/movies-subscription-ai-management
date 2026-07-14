const express = require('express')
const permissionsService = require('../services/permissionsService')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { permissions } = await permissionsService.getAll();
        res.send(permissions)
    } catch (e) {
        res.send(e)
    }

})

module.exports = router