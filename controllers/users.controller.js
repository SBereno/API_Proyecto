const userQueries = require('../services/UserQueries');
const userSignUp = require('../services/UserSignUp');

const loginAttempt = async function(req, res) {
    res.send(await userQueries.userList(req.body.name, req.body.password));
};

const signUp = function(req, res) {
    res.send(userSignUp.userSignUp(req.body.name, req.body.password))
};

module.exports = {
    loginAttempt,
    signUp
};