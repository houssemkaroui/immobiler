const express = require('express');
const visiteController = require('../controllers/visiteConttroller')
const authController = require('../controllers/authController');

const multer = require("multer");

const router = express.Router();
router.use(authController.protect);
router.get('/AllVisite',visiteController.GetAll);

router.delete('/:id',visiteController.deleteVisite);
router.patch('/:id',visiteController.updateVisite);
router.get('/:id',visiteController.getVisite);
router.post('/addVisite',visiteController.AjouterVisite);
router.get('/',visiteController.GetListeVisite);

module.exports = router;