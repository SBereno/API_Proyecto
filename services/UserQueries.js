const mongoose = require('mongoose');

const UserModel = require('../schemas/UserModel');
const uri = 'mongodb+srv://admin:admin@bdm06-qrx5v.mongodb.net/Login?retryWrites=true&w=majority'

mongoose
    .connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        throw err;
    });

const userList = function(user, pass) {
    return UserModel
        .findOne({$and: [{Username: user}, {Password: pass}]})
        .exec()
        .then((user) => {
            return !!user;
            mongoose.connection.close();
        })
        .catch((err) => {
            mongoose.connection.close();
            throw err;
        });
};

module.exports = {
    userList
};