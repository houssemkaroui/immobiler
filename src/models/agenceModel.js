
const mongoose = require('mongoose');

const AgenceSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Please tell us your nom!'],
       
    },
    numeroTelephone :{
        type: Number,
        unique: true,
        required: [true, 'Veuillez saisir votre numero téléphone'],
        minlength: 10,
        validate: {
          validator: function (el) {
              console.log(el)
            return el.toString().length > 10 || el.toString().length < 12;
          },
          message: 'Votre numero doit etre au minimum 10  et au max 12 characters'
        }
    },
    addresse: {
        type: String,
        required: [true, 'Please tell  your addresse!'],
    },

});

const Agence = mongoose.model('Agence', AgenceSchema);

module.exports = Agence;
