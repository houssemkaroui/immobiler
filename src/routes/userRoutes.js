const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController');
const router = express.Router();
router.post(
  '/signup',
  fileController.uploadModelPhotoSingle,
  fileController.resizeModelPhoto('User'),
  authController.signup
);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);
router.post('/veriferCode',authController.veriferCode)
router.use(authController.protect);
router.get('/liste',authController.restrictTo('admin'),userController.GetAllTypeUser)
router.get('/listeAgent',authController.restrictTo('admin'),userController.GetListeAgent)
router.get('/Me', userController.getMe, userController.getUser);
router.patch('/updateIDdevice',authController.ajouterIDdeviece)

router.patch('/updateMyPassword', authController.updatePassword);

router.patch(
  '/updateMe',
  fileController.uploadModelPhotoSingle,
  fileController.resizeModelPhoto('User'),
  userController.updateMe
);


router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.patch(
  '/:id',
  fileController.uploadModelPhotoSingle,
  fileController.resizeModelPhoto('User'),
  userController.updateUser
);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(fileController.uploadModelPhotoSingle,fileController.resizeModelPhoto('User'),userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
