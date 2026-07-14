const express = require('express')
const subscriptionsService = require('../services/subscriptionsService')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const subscriptions = await subscriptionsService.getAll();
        res.send(subscriptions)
    } catch (e) {
        res.send(e)
    }

})

// Get subscription by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await subscriptionsService.getById(id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// Add a new subscription
router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const result = await subscriptionsService.addSubscription(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a subscription
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await subscriptionsService.updateSubscription(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Delete subscription
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subscriptionsService.deleteSubscription(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router