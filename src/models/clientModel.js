
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Please tell  your nom!'],
       
    },
    photo:{
      type:String,
      required:[true,'Please tell  your photo!']
    },
    numeroTelephone :{
        type:Number,
        required:[true,'Please tell  your phone!']
    },
    email :{
     type:String,
    required:[true,'Please tell  your email!']
    },
    typeTransaction :{
        type:String,
        required:[true,'Please tell  your type Transaction!']
    },
    agence :{
        required: [true,'chaque client a son agence!'],
        type: Schema.Types.ObjectId,
        ref: 'Agence',
    },

    UserID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },


});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
