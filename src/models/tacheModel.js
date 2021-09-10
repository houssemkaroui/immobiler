
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const tacheSchema = new mongoose.Schema({
  nomTache:{
    type:String,
      required:[true,'Please tell  your nomTache!']
  },
   typeTache:{
     type:String,
     enum:['achatOlivers', 'banque','poste','municipalite','tribunal','autres'],
     required:[true,'Please tell  your typeTache!']
   },
    description:{
        type:String,
        required:[true,'Please tell  your dateDebut!']
    },
    statusTache :{
        type:String,
        enum: ['encours', 'fini','afaire'],
        default:'afaire'
    },

  dateDebut: {
    type: Date,
    required: [true, 'Please tell  your dateDebut!']
  },
  dateFien: {
    type: Date,
    required: [true, 'Please tell  your dateFien!']
  },

  agentID: {
    required: [true, 'chaque tache doit affecter a un agent!'],
    type: ObjectId,
    ref: 'User',
  },

});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;
