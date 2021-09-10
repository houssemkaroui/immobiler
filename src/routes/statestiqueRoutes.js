const express = require('express');
const statestiqueController = require('../controllers/statestiqueController')
const authController = require('../controllers/authController');



const router = express.Router();
router.use(authController.protect);
router.get('/Nombre',statestiqueController.NombreVisteByAgent);




module.exports = router;