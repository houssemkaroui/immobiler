const express = require('express');
const tacheController = require('../controllers/tacheController')
const authController = require('../controllers/authController');


const router = express.Router();

router.use(authController.protect);
router.get('/AllTache',tacheController.GetAll);

router.post('/addTache',tacheController.AjouterTache);
router.get('/ListeTacheByAgent',tacheController.GetListeTache);

router.patch('/:id',tacheController.updateStautus);
router.delete('/:id',tacheController.deleteTache);

module.exports = router;