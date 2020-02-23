const UserQueries = require('../services/UserQueries')

const loginAttempt = async function(req, res) {
    res.send(await UserQueries.userList(req.body.name, req.body.password));
};
module.exports = {
    loginAttempt
};