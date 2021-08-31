
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const tacheSchema = new mongoose.Schema({
    tacheNom:{
        type:String,
        required:[true,'Please tell  your dateDebut!']
    },
    statusTache :{
        type:String,
        enum: ['encours', 'fini','accepter'],
    },

  dateDebut: {
    type: Date,
    required: [true, 'Please tell  your dateDebut!']
  },
  dateFien: {
    type: Date,
    required: [true, 'Please tell  your dateFien!']
  },

  UserID: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },

});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;
