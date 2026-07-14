const Movie = require('./models/movieModel')
const Member = require('./models/memberModel')
const moviesService = require('./services/moviesService')
const membersService = require('./services/membersService')


const populateMovies = async () => {
    const { data } = await moviesService.getAll();
    const movies = data.splice(0, 10).map(movie => ({ name: movie.name, genres: movie.genres, image: movie.image.medium, premiered: movie.premiered }))
    return Movie.insertMany(movies)
}

const populateMembers = async () => {
    const { data } = await membersService.getAll();
    const members = data.map(member => ({ name: member.name, email: member.email, city: member.address.city }))
    return Member.insertMany(members)
}

const onStart = () => {
    populateMovies();
    populateMembers();
}

module.exports = onStart