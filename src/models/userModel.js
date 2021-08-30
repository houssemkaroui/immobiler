
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  prenom: {
    type: String,
    required: [true, 'Veuillez saisir votre numero prenom']
  },
  phonenumber: {
    type: Number,
    unique: true,
    required: [true, 'Veuillez saisir votre numero telephone'],
    minlength: 10,
    validate: {
      validator: function (el) {
        return el.toString().length > 10 || el.toString().length < 12;
      },
      message: 'Votre numero doit etre au minimum 10  et au max 12 characters'
    }
  },
  codeVerficationWithEmail: {
    type: Number, default: 0000
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String,
   
    required: [true,'Please provide your photo']
  },
  role: {
    type: String,
    enum: ['agent', 'admin','chefAgent'],
    default: 'agent'
  },
// agence:{
//   required: [true, 'Chaque agen doit affecter a une agence'],
//   type: mongoose.Schema.ObjectId,
//   ref: 'agences',
// },
  password: {
    type: String,
    required: [true, 'merci de saisir votre mots de passe'],
    minlength: 4,
    select: false
  },

  lat: {
    type: String,
    // required: true
  },
  lng: {
    type: String,
    // required: true
  },
  IDdevice: {
    type: String,
    // required:[true,'chaque utilisateur doit avoir un id divice'],
    default: '1423-9824654822-44f44r55d'
  },

  createdAt: {
    type: Date,
    default: new Date()

  },

  active: {
    type: Boolean,
    default: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'merci de confirmer votre  mot de passe '],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'les mots de passe ne sont pas les mêmes!'
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(4).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
