const userQueries = require('../services/UserQueries');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userLogin(req.body.name, req.body.password));
};

const signUp = function(req, res) {
    res.send(userQueries.userSignUp(req.body.name, req.body.password))
};

const deleteAttempt = async function(req, res) {
    res.send(await userQueries.userDelete(req.body.name));
};

const getMyProfile = async function(req, res) {
    res.send(await userQueries.myProfile(req.body.name));
};

const getUsersList = async function(req, res) {
    res.send(await userQueries.userList());
};

module.exports = {
    loginAttempt,
    signUp,
    deleteAttempt,
    getMyProfile,
    getUsersList
};