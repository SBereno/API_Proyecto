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

//Metode de login
const userLogin = async function(user, pass) {
    const incorrecto = {
        mensaje: 'Usuario o password incorrectos'
    };
    //Primer es busca l'usuari amb qui es vol fer el login
    var usuario = await UserModel.findOne({ Username: user }).exec();
    //Es compara la contrasenya de l'usuari existent amb la rebuda des de el login
    if(!!usuario) {
        if(bcrypt.compareSync(pass, usuario.Password)) {
            //En cas de ser correcte, es genera el token
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
            return correcto;
        } else {
            //Si les contrasenyes no son iguals o no es troba l'usuari, retorna 'incorrecto'
            return incorrecto;
        }
    } else {
        return incorrecto;
    }
};

//Metode de registre
const userSignUp = function (username, pass, res) {
    //Primer es comprova que l'usuari no existeixi a la base de dades
    UserModel.find({Username: username})
    .exec()
    .then(user => {
        //Si existeix, retorna el missatge 'Usuario ya existe'
        if (user.length >= 1) {
            return res.status(409).json({
                mensaje: "Usuario ya existe"
            });
        } else {
            //Si no existeix, es genera el hash mitjançant la password rebuda del client y s'indica el temps que trigarà en calcular-lo (variable saltRounds)
            const hash = bcrypt.hashSync(pass, saltRounds);
            console.log(hash);
            //Es genera un usuari amb el hash com a password
            const newUser = new UserModel({
                Username : username,
                Password : hash
            });
            //I es guarda l'usuari a la base de dades
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