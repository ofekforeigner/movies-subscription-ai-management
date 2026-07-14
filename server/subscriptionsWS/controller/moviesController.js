const express = require('express')
const moviesService = require('../services/moviesService')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretkey'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            res.status(401).send('No token provided');
        }
        jwt.verify(token, JWT_SECRET, async (err, data) => {
            if (err) {
                res.status(500).send('Failed to authenticate token');
            }
            const resp = await moviesService.getAll();
            const movies = resp.splice(0, 15)
            res.send(movies)
        });
    } catch (e) {
        res.send(e)
    }

})

// Get movie by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await moviesService.getById(id);
        res.send(movie);
    } catch (error) {
        res.send(error);
    }
});

// Add a new movie
router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const result = await moviesService.addMovie(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a movie
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await moviesService.updateMovie(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Delete movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await moviesService.deleteMovie(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router