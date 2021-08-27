
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const inlineBase64 = require("nodemailer-plugin-inline-base64");
const nodemailer = require("nodemailer");

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
     user: process.env.GMAIL_USER,
     pass: process.env.GMAIL_PASS,
  },
});
transporter.use("compile", inlineBase64({ cidPrefix: "123" }));


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
 
//regester user
exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('Veuillez remplir votre formulaire!', 400));
  }

  if (req.file) req.body.photo = req.file.filename;
  var val = Math.floor(1000 + Math.random() * 9000);
  req.body.password = val
  req.body.passwordConfirm = val
  const newUser = await User.create(req.body);
  const token = await signToken(newUser._id);
  
  await transporter.sendMail({
    to: req.body.email,
    subject: "Confirm Account",
     text: "Your Password is : " + req.body.password,
 });
 newUser.password = undefined;
 res.status(200).json({
    status: "success",
    token,
    data: {
       newUser,
    },
 });
 // SendSMS(newUser);
});

 

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Merci de saisir email et password correcte!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError("User Not found", 400));
  }
  if (user.active == false) {
    return next(new AppError("Vous n'avez pas les droits d'accés!", 400));
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('wrong Password', 401));
  }

  const token = await signToken(user._id);
  user.password = undefined;
  
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
 // createSendToken(user, 200, res)
});



exports.ajouterIDdeviece = catchAsync(async(req,res,next) =>{
  if(!req.user.id) {
    return next (new AppError('verifer votre token',400))
  }
  //user.IDdevice = req.body.IDdevice
  await User.findByIdAndUpdate(req.user.id, {
    IDdevice: req.body.IDdevice
  });
  res.status(200).send({
    message:'ID device ajouter avec succes'
  })
})
//send code with SMS phone
const SendSMS = catchAsync(async (user, req, res, next) => {
  const phonenumber = user.phonenumber;
  if (!phonenumber) {
    return next(new AppError('Numéro de téléphone invalide!', 400));
  }
  const SMS = await client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      locale: 'fr',
      to: `+${phonenumber}`,
      channel: 'sms'
    });
});

//verifer le code envoyer SMS
exports.VeriferCodeSMS = catchAsync(async (req, res, next) => {
  if (!req.body.phonenumber && !req.body.code) {
    return next(new AppError('Code de vérification invalide ou expiré!', 400));
  }

  const verifercode = await client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      to: `+${req.body.phonenumber}`,
      code: req.body.code
    });
    
  const user = await User.findOneAndUpdate(
    { phonenumber: req.body.phonenumber },
    { active: true }
  );

  if (verifercode.status === 'approved') {
    res.status(200).send({
      message: 'votre compte est confirme!'
    });
  } else {
    res.status(400).send({
      message: 'User not Verified!!'
    });
  }
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
   
    if (!role.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
//envoyer le code pour verifer 
exports.forgotPassword = catchAsync(async (req, res, next) => {
 
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("Il n'y a aucun utilisateur avec ce numéro de email", 404));
  }
  var val = Math.floor(1000 + Math.random() * 9000);
  req.body.codeVerficationWithEmail = val;
  const data = await User.findOneAndUpdate(
    { email: req.body.email },
    { codeVerficationWithEmail: val }
 );

  await transporter.sendMail({
    to: req.body.email,
    subject: "Reset password",

     text: "Please click this email to reset your password: " + val,
 });

  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  try {
    res.status(200).json({
      status: 'success',
      message: 'code  sent to your email!'

    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("il ya un erreur lors de l'envois de code . Try again later!"),

      500
    );
  }
});

//verifer le code 
exports.veriferCode = catchAsync(async (req, res, next) => {
  const code = await User.findOne({codeVerficationWithEmail: req.body.codeVerficationWithEmail});
  if(!code) {
    return next(new AppError('No compte with this code .', 400));
  }
  
  res.status(200).send({
     message: "vous pouvez modifer votre password",
  });
});

///changer le mot de passe 
exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("verifer votre code ", 400));

  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  const token = await signToken(user._id);

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  res.status(200).json({
    status: "success",
    token,
    data: {
       user,
    },
 });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200,  res);
});

