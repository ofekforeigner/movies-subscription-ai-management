const axios = require('axios')
const Movie = require('../models/movieModel')


const MOVIES_URL = 'https://api.tvmaze.com/shows'

const getMovies = () => {
    return axios.get(MOVIES_URL);
}


// Get All
const getAllMovies = () => {
    return Movie.find({});
};

// Get By ID
const getById = (id) => {
    return Movie.findById(id);
};

// Create
const addMovie = (obj) => {
    const movie = new Movie(obj);
    return movie.save();
};

// Update
const updateMovie = (id, obj) => {
    return Movie.findByIdAndUpdate(id, obj);
};

// Delete
const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id);
};

module.exports = { getMovies, getAllMovies, getById, addMovie, updateMovie, deleteMovie }