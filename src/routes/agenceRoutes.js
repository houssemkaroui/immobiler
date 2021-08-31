const express = require('express');
const agenceController = require('../controllers/agenceController')
const authController = require('../controllers/authController');


const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));
router.post('/addAgence',agenceController.AjouterAgence);
router.get('/AllAgence',agenceController.GetAll);
router.delete('/:id',agenceController.deleteAgence);


module.exports = router;