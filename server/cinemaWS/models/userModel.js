const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    },
    { versionKey: false }
);

// A 'model' is a class with which we construct documents in a collection
const User = mongoose.model('user', userSchema, 'users');
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.

module.exports = User;