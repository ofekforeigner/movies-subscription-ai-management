const express = require('express')
const usersService = require('../services/usersService')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.getById(id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// Add new user
router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const result = await usersService.addUser(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await usersService.updateUser(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usersService.deleteUser(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router