
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Please tell us your nom!'],
       
    },
    photo:{
      type:String
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
        type:String,
        required:[true,'Please tell us your type agence!']
    },

    UserID: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },


});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
