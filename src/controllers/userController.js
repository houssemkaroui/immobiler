const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.user
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.user.id);
  if (req.file) filteredBody.photo = req.file.filename;
  filteredBody.name = req.body.name
  filteredBody.eamil = req.body.email
  filteredBody.address = req.body.address
  filteredBody.lat = req.body.lat     
  filteredBody.lng = req.body.lng
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

//consulter la liste de tous les utilisateurs
exports.GetAllTypeUser = catchAsync(async(req,res,next) =>{

  const listeAgent = await User.find({}).populate({path:'agence'});
  if(!listeAgent) {
      return next (new AppError("Eroor lors de get liste des client",400))
  }
  res.status(200).send({
      data:listeAgent,
      result:listeAgent.length
  })
})

//consulte la liste des agent
exports.GetListeAgent = catchAsync(async(req,res,next) =>{

  const listeAgent = await User.find({role:'agent'}).populate({path: 'agence'});
  if(!listeAgent) {
      return next (new AppError("Eroor lors de get liste des client",400))
  }
  res.status(200).send({
      data:listeAgent,
      result:listeAgent.length
  })
})


//consulte un agent
// exports.getUser = catchAsync(async(req,res,next) =>{

//   const agent = await User.findById(req.params.id).populate({path: 'agence'});
//   if(!agent) {
//       return next (new AppError("Eroor lors de get liste des client",400))
//   }
//   res.status(200).send({
//       data:agent,
      
//   })
// })