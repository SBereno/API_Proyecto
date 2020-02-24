const userQueries = require('../services/UserQueries');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userLogin(req.body.name, req.body.password));
};

const signUp = function(req, res) {
    res.send(userQueries.userSignUp(req.body.name, req.body.password))
};

const deleteAttempt = function(req, res) {
    res.send(userQueries.userDelete(req.body.name));
};

module.exports = {
    loginAttempt,
    signUp,
    deleteAttempt
};