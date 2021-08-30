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
router.use(authController.restrictTo('admin'));
router.get('/AllCategorie',categorieController.GetAll);
router.post('/addCategorie',upload.array('photo',10),categorieController.AjouterCategorie);
router.delete('/:id',categorieController.deleteUser);

router.use(authController.restrictTo('agent'));
router.post('/addCategorie',upload.array('photo',10),categorieController.AjouterCategorie);
router.get('/ListeCategorieByAgent',categorieController.GetListeCategorie);

module.exports = router;