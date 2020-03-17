const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {type: String, required: true, unique : true},
    Password: {type: String, required: true},
    Games: {type: Array},
    GameStatus: {type: Array},
    StartDate: {type: Array},
    FinalDate: {type: Array},
    Scores: {type: Array},
    Comentarios: {type: Array}
}, {versionKey: false});

module.exports = mongoose.model('User', UserSchema)