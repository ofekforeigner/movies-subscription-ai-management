const subsRep = require('../repositories/subscriptionsRepo');


const getAll = (filters) => {
    return subsRep.getAllSubscriptions(filters);
};

const getById = (id) => {
    return subsRep.getById(id);
};

const addSubscription = (obj) => {
    console.log('here service');
    console.log(obj);
    const [year, month, day] = obj.movies[0].date.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    const subDate = date.toISOString();
    obj.movies[0].date = subDate;

    return subsRep.addSubscription(obj);
};

const updateSubscription = async (id, obj) => {
    const sub = await getById(id)

    const [year, month, day] = obj.date.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    const subDate = date.toISOString()

    sub.movies = [...sub.movies, { movieId: obj.movieId, date: subDate }]

    return await subsRep.updateSubscription(id, sub);
};

const deleteSubscription = (id) => {
    return subsRep.deleteSubscription(id);
};

module.exports = {
    getAll,
    addSubscription,
    getById,
    updateSubscription,
    deleteSubscription,
};