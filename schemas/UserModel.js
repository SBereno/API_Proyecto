const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {type: String, required: true, unique : true},
    Password: {type: String, required: true},
    Games: {type: [{}]}
}, {versionKey: false});

module.exports = mongoose.model('User', UserSchema)