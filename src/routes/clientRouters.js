const express = require('express');
const clientController = require('../controllers/clientController')
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uplodeController');


const multer = require("multer");


const router = express.Router();
const storage = uploadController.storage('public/img/Client');
const upload = multer({
  storage: storage
});

router.use(authController.protect);
router.get('/AllClient',clientController.GetAll);
router.delete('/:id',clientController.deleteClient);
router.patch('/:id',upload.array('photo'),clientController.updateClient);
router.post('/addClient',upload.array('photo'),clientController.AjouterClient);
router.get('/ListeClientByAgent',clientController.GetListeClient);
router.get('/:id',clientController.getclient);

module.exports = router;