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

router.route('/deleteGames').delete(usersController.deleteGame);

router.route('/updateGames').put(usersController.updateGame);

router.use((req, res, next) => {
  //Es demana el header 'access-token' a l'usuari
  const token = req.headers['access-token'];
  //Si s'envia, es comproba que sigui valid
  if (token) {
    jwt.verify(token, config.llave, (err, decoded) => {      
    //En cas de no ser valida (han passat 10 minuts), es retorna 'Token invalida'
    if (err) {
      return res.json({ mensaje: 'Token inválida' });    
    } else {
      //En canvi, si es valida, es guarda la request per a utilitzarla en altres rutes
      req.decoded = decoded;    
      next();
    }
    });
  //En cas de no enviar token ens retorna 'Token no proveida' 
  } else {
    res.send({ 
    mensaje: 'Token no proveída.' 
    });
  }
});

router.route('/delete').delete(usersController.deleteAttempt);

router.route('/update').put(usersController.updateAttempt);

module.exports = router;