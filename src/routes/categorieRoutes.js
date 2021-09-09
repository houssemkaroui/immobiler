const express = require('express');
const categorieController = require('../controllers/categorieController')
const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController');
const uploadController = require('../controllers/uplodeController');

const multer = require("multer");

const router = express.Router();
const storage = uploadController.storage('public/img/Categories');
const upload = multer({
  storage: storage
});

router.use(authController.protect);

router.get('/AllCategorie',categorieController.GetAll);
router.post('/addCategorie',upload.array('photo',10),categorieController.AjouterCategorie);
router.delete('/:id',categorieController.deleteBien);

router.post('/addCategorie',upload.array('photo',10),categorieController.AjouterCategorie);
router.get('/ListeCategorieByAgent',categorieController.GetListeCategorie);
router.get('/:id',categorieController.getBien)
router.patch('/:id',upload.array('photo',10),categorieController.updateBien)
module.exports = router;