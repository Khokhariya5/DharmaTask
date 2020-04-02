const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    insertedAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: undefined},
});

let UsersModel = mongoose.model('users', UserSchema);

// Export the model
module.exports = UsersModel;