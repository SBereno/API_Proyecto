const userQueries = require('../services/UserQueries');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userLogin(req.body.name, req.body.password));
};

const signUp = async function(req, res) {
    await userQueries.userSignUp(req.body.name, req.body.password, res);
};

const deleteAttempt = async function(req, res) {
    res.send(await userQueries.userDelete(req.body.name));
};

const updateAttempt = function(req, res) {
    res.send(userQueries.userUpdate(req.body.name, req.body.newName, req.body.newPassword));
};

const getMyProfile = async function(req, res) {
    res.send(await userQueries.myProfile(req.body.name));
};

const getUsersList = async function(req, res) {
    res.send(await userQueries.userList());
};

const addGame = async function(req, res) {
   res.send(await userQueries.addGame(req.body.name, req.body.game));
};

const deleteGame = async function(req, res) {
    await userQueries.deleteGame(req.body.name, req.body.gamename, res);
};

const updateGame = async function(req, res) {
    await userQueries.updateGame(req.body.name, req.body.game, res);
};

module.exports = {
    loginAttempt,
    signUp,
    deleteAttempt,
    getMyProfile,
    getUsersList,
    updateAttempt,
    addGame,
    deleteGame,
    updateGame
};