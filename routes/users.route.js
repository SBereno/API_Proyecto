const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const router = express.Router({ mergeParams: true });

const usersController = require('../controllers/users.controller');

router.route('/login').post(usersController.loginAttempt);

router.route('/signup').post(usersController.signUp);

router.route('/myProfile').post(usersController.getMyProfile);

router.route('/list').get(usersController.getUsersList);

router.route('/addGames').post(usersController.addGame);

router.use((req, res, next) => {
    console.log(req);
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, config.llave, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

router.route('/delete').delete(usersController.deleteAttempt);

router.route('/update').put(usersController.updateAttempt);

module.exports = router;