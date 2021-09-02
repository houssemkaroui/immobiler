
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const tacheSchema = new mongoose.Schema({
  nomTache:{
    type:String,
      required:[true,'Please tell  your nomTache!']
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
clientId:{
  required: [true, 'chaque tache doit affecter a un client!'],
  type: ObjectId,
  ref: 'Client',
},
  agentID: {
    required: [true, 'chaque tache doit affecter a un agent!'],
    type: ObjectId,
    ref: 'User',
  },

});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;
