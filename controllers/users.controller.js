const userQueries = require('../services/UserQueries');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userList(req.body.name, req.body.password));
};

const signUp = function(req, res) {
    res.send(userQueries.userSignUp(req.body.name, req.body.password))
};

module.exports = {
    loginAttempt,
    signUp
};