
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Please tell  your nom!'],

    },
    prenom: {
        type: String,
        required: [true, 'Please tell  your prenom!'],
    },
    zone: {
        type: String,
        required: [true, 'Please tell  your zone!'],
    },
    photo:{
      type:String,
      required:[true,'Please tell  your photo!']
    },
    numeroTelephone :{
        type:String,
        required:[true,'Please tell  your phone!']
    },
    email :{
     type:String,
    required:[true,'Please tell  your email!']
    },
    typeTransaction :{
        type: String,
        enum: ['location', 'vente'],
        default: 'location',
        required: [true,'chaque client a son typeTransaction!']
    },
    agence :{
        required: [true,'chaque client a son agence!'],
        type: ObjectId,
        ref: 'Agence',
    },
    agentID :{
        type: ObjectId,
        ref: 'User',
    },
    UserID: {
        required: true,
        type: ObjectId,
        ref: 'User',
    },


});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
