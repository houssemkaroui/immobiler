
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const visiteSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: [true, 'Please tell  your reference!'],
  },
  numeroTelephone: {
    type: Number,
    unique: true,
    required: [true, 'Veuillez saisir votre numero telephone'],
    minlength: 10,
    validate: {
      validator: function (el) {
        return el.toString().length > 10;
      },
      message: 'Votre numero doit etre au minimum 10 characters'
    }
  },
  agent: {
    required: [true, 'chaque Visite contient un agent'],
    type: ObjectId,
    ref: 'User',
  },
  frais: {
    type: String,
    required: [true, 'Please tell us your frais!']
  },
  addresse: [String],
  dateDebut: {
    type: Date,
    required: [true, 'Please tell  your dateDebut!']
  },
  dateFien: {
    type: Date,
    required: [true, 'Please tell us your dateFien!']
  },
  UserID: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },

});

const Visite = mongoose.model('Visite', visiteSchema);

module.exports = Visite;
