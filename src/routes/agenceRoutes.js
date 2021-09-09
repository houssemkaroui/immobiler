const express = require('express');
const agenceController = require('../controllers/agenceController')
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/addAgence',agenceController.AjouterAgence);
router.get('/AllAgence',agenceController.GetAll);
router.delete('/:id',agenceController.deleteAgence);
router.get('/:id',agenceController.getAgence);
router.patch('/:id',agenceController.updateagence);
module.exports = router;