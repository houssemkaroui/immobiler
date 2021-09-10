
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const visiteSchema = new mongoose.Schema({


  agent: {
    required: [true, 'chaque Visite contient un agent'],
    type: ObjectId,
    ref: 'User',
  },
  frais: {
    type: String,
    required: [true, 'Please tell your frais!']
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
  clientId: {
    required: true,
    type: ObjectId,
    ref: 'Client',
  },
  refernceBien: [
    {
      required: true,
      type: ObjectId,
      ref: 'Categorie',
    },
  ],

  statusVisite: {
    type: String,
    enum: ['encours', 'raporter', 'anuller'],
    default: 'encours'
  },

  UserID: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },

});

const Visite = mongoose.model('Visite', visiteSchema);

module.exports = Visite;
