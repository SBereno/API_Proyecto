const userQueries = require('../services/UserQueries');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userLogin(req.body.name, req.body.password));
};

const signUp = async function(req, res) {
    res.send(await userQueries.userSignUp(req.body.name, req.body.password))
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

module.exports = {
    loginAttempt,
    signUp,
    deleteAttempt,
    getMyProfile,
    getUsersList,
    updateAttempt
};