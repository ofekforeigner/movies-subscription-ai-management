const express = require('express')
const membersService = require('../services/membersService')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const members = await membersService.getAll();
        res.send(members)
    } catch (e) {
        res.send(e)
    }

})

// Get member by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await membersService.getById(id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// Add a new member
router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const result = await membersService.addMember(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a member
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await membersService.updateMember(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Delete member
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await membersService.deleteMember(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router