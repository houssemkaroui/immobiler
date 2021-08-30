
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Please tell us your nom!'],
       
    },
    photo:{
      type:String,
      required:[true,'Please tell us your photo!']
    },
    numeroTelephone :{
        type:Number,
        required:[true,'Please tell us your phone!']
    },
    email :{
     type:String,
    required:[true,'Please tell us your email!']
    },
    typeTransaction :{
        type:String,
        required:[true,'Please tell us your type Transaction!']
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
