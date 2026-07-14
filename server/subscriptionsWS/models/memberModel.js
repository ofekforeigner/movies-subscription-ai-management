const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        city: String
    },
    { versionKey: false }
);

// A 'model' is a class with which we construct documents in a collection
const Member = mongoose.model('member', memberSchema, 'members');
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.

module.exports = Member;