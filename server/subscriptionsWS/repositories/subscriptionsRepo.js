const Subscription = require('../models/subscriptionModel')

// Get All
const getAllSubscriptions = (filters) => {
    return Subscription.find(filters);
};

// Get All By User Id
const getAllSubscriptionsByUserId = (uid) => {
    return Subscription.find({ memberId: uid });
};

// Get By ID
const getById = (id) => {
    return Subscription.findById(id);
};

// Create
const addSubscription = (obj) => {
    const sub = new Subscription(obj);
    return sub.save();
};

// Update
const updateSubscription = (id, obj) => {
    return Subscription.findByIdAndUpdate(id, obj);
};

// Delete
const deleteSubscription = (id) => {
    return Subscription.findByIdAndDelete(id);
};

const getByMovieId = (id) => {
    return Subscription.find({ "movies.movieId": id })
};


module.exports = {
    getAllSubscriptions,
    getAllSubscriptionsByUserId,
    getById,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getByMovieId
}