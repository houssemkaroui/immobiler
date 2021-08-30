const express = require('express');
const visiteController = require('../controllers/visiteConttroller')
const authController = require('../controllers/authController');

const multer = require("multer");

const router = express.Router();


router.use(authController.protect);
router.get('/AllVisite',visiteController.GetAll);


router.post('/addVisite',visiteController.AjouterVisite);
router.get('/ListeVisiteByAgent',visiteController.GetListeVisite);

module.exports = router;