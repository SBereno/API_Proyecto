const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require('../schemas/UserModel');
const uri = 'mongodb+srv://' + config.atlasUsername + ':' + config.atlasPassword + '@bdm06-qrx5v.mongodb.net/Login?retryWrites=true&w=majority';

mongoose
    .connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        throw err;
    });

const userLogin = async function(user, pass) {
    var usuario = await UserModel.findOne({ Username: user }).exec();
    if(bcrypt.compareSync(pass, usuario.Password)) {
        const payload = {
            User: user
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
        if (!!usuario) {
            return correcto;
        } else {
            return incorrecto;
        }
    } 
};

const userSignUp = function (username, pass, res) {
    UserModel.find({Username: username})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                mensaje: "Usuario ya existe"
            });
        } else {
            const hash = bcrypt.hashSync(pass, saltRounds);
            console.log(hash);
            const newUser = new UserModel({
                Username : username,
                Password : hash
            });
            newUser.save()
            .then(result => {
                console.log(result);
                return res.status(201).json({
                    mensaje: "Usuario registrado"
                });
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    })
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
    return UserModel.find({Username: user}, {_id:0, Password:0});
};

const userUpdate = function(user, newUsername, newPassword) {
    var newUser = {
        Username: newUsername,
        Password: newPassword
    };

    UserModel.updateOne({Username: user}, {$set: newUser}, function (err) {
        if(err) throw err;
        console.log('Operacion finalizada');
    });
};

const addGame = async function(username, game) {
    var user = await UserModel.findOne({Username: username});
    user.Games.push(game);
    UserModel.updateOne({Username: username}, {$set: user}, function (err) {
        if(err) throw err;
        return user;
    });
};

const deleteGame = async function(username, gamename, res) {
    UserModel.updateOne({Username: username}, {$pull: {"Games" : {Name: gamename}}}, function(err) {
        if(err) throw err;
        console.log('Operacion finalizada');
        return res.status(200).json({
            mensaje: "Operacion finalizada"
        });
    });
};

const updateGame = async function(username, oldName, game, res) {
    UserModel.updateOne({Username: username, 'Games.Name': oldName}, {$set: {"Games.$": game}}, function (err) {
        if(err) throw err;
        console.log('Operacion finalizada');
        return res.status(200).json({
            mensaje: "Operacion finalizada"
        });
    });
};

module.exports = {
    userLogin,
    userSignUp,
    userDelete,
    userList,
    myProfile, 
    userUpdate,
    addGame,
    deleteGame,
    updateGame
};