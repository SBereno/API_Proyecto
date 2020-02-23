const mongoose = require('mongoose');

const UserModel = require('../schemas/UserModel');
const uri = 'mongodb+srv://admin:admin@bdm06-qrx5v.mongodb.net/Login?retryWrites=true&w=majority'

mongoose
    .connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        throw err;
    });

const userSignUp = function (user, pass) {
    var newUser = {
        Username: user,
        Password: pass
    };
    return UserModel
        .insertMany(newUser, function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result);
            }
        });
};

module.exports = {
    userSignUp
};