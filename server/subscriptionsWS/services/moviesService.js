const moviesRepo = require('../repositories/moviesRepo')

const getAll = () => {
    return moviesRepo.getAllMovies();
}

const getById = (id) => {
    return moviesRepo.getById(id);
};

const addMovie = (obj) => {
    const [year, month, day] = obj.premiered.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    obj.premiered = date.toISOString();
    return moviesRepo.addMovie(obj);
};

const updateMovie = (id, obj) => {
    const [year, month, day] = obj.premiered.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    obj.premiered = date.toISOString();
    return moviesRepo.updateMovie(id, obj);
};

const deleteMovie = (id) => {
    return moviesRepo.deleteMovie(id);
};




module.exports = { getAll, getById, addMovie, updateMovie, deleteMovie }