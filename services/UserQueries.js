const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const UserModel = require('../schemas/UserModel');
const uri = 'mongodb+srv://' + config.atlasUsername + ':' + config.atlasPassword + '@bdm06-qrx5v.mongodb.net/Login?retryWrites=true&w=majority';

mongoose
    .connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        throw err;
    });

const userLogin = function(user, pass) {
    return UserModel
        .findOne({$and: [{Username: user}, {Password: pass}]})
        .exec()
        .then((user) => {
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, config.llave, {
                expiresIn: 600
            });
            const correcto = {
                mensaje: 'Autenticacion correcta',
                token: token
            };
            const incorrecto = {
                mensaje: 'Usuario o password incorrectos'
            };
            if (!!user) {
                return correcto;
            } else {
                return incorrecto;
            }
        })
        .catch((err) => {
            mongoose.connection.close();
            throw err;
        });
};

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

const userDelete = function(userToDelete) {
    UserModel.deleteOne({ Username: userToDelete }, function (err) {
        if(err) throw err;
        console.log('Operacion finalizada');
    });
};

const userList = function() {
    return UserModel.find({}, {Username:1, _id:0});
};

const myProfile = function(user) {
    return UserModel.find({Username: user}, {Username:1});
};

module.exports = {
    userLogin,
    userSignUp,
    userDelete,
    userList,
    myProfile
};