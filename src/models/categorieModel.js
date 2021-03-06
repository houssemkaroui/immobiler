
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const bienSchema = new mongoose.Schema({
    typeBien: {
        type: String,
        required: [true, 'Please tell us your typeBien!'],
        enum: ['Maison', 'Terrain', 'Appartement',"etageVilla"],
    },
    prix: {
        type: Number,
        required: [true, 'Please tell  your price!']
    },
    photo: [String],
    reference: {
        type: String,
        unique:true,
        required: [true, 'reference déja utiliser!']
    },
    description: {
        type: String
        //required: [true, 'Please tell  your Description!']
    },

    nomPropritaire: {
        type: String,
        required: [true, "Please tell  your nomPropritaire!"]
    },
    cin: {
        type: Number,
        required: [true, 'Please tell  your CIN!']
    },
    adresseProprietaire: {
        type: String,
        required: [true, 'Please tell  your adresseProprietaire!']
    },
    numeroTitre: {
        type: String,
        required: [true, "Please tell  your numeroTitre!"]
    },
    formJuridique: {
        type: String,
        required: [true, 'Please tell  your formJuridique!']
    },
    surfaceTotale: {
        type: String,
        required: [true, 'Please tell  your surfaceTotale!']
    },
    superficeCouverte: {
        type: String,
    },
    superfice: {
        type: String,
    },
    superficeConstructible: {
        type: String,
    },
    adresse: {
        type: String,
        required: [true, 'Please tell  your adresse!']
    },
    codePostale: {
    type: Number,
    required: [true, 'Veuillez saisir votre codePostale'],
    minlength: 4,
    validate: {
      validator: function (el) {
        return el.toString().length = 4 ;
      },
      message: 'Votre codePostale doit etre 4 characters'
    }
    },
    phone:{
        type:String,
        required:[true,'Please tell  your phone!'],
        validate: {
            validator: function (el) {
              return el.toString().length > 10 || el.toString().length < 12;
            },
            message: 'Votre numero doit etre au minimum 10  et au max 12 characters'
          }
    },
    categorieTerain:{
        type: String,
        enum: ['terrainConstructible', 'ferme']
    },
    // categorieLocale:{
    //     type: String,
    //     enum: ['maison', 'appartement','etageVilla',""]
    // },
    statu: {
        type: String,
        enum: ['location', 'vente']
    },
    ferme: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    forme: {
        type: String
    },
    separation: {
        type: String
    },
    facade: {
        type: String
    },
    largeur: {
        type: String
    },
    annesConstruction: {
        type: Date
    },
    cloture: {
        type: Boolean,
        default: false
    },
    permiBatir: {
        type: Boolean,
        default: false
    },
    eau: {
        type: Boolean,
        default: false
    },
    electriciter: {
        type: Boolean,
        default: false
    },
    gaze: {
        type: Boolean,
        default: false
    },
    onasse: {
        type: Boolean,
        default: false
    },
    commerciale: {
        type: Boolean,
        default: false
    },
    climatiseur: {
        type: Boolean,
        default: false
    },
    chauffage: {
        type: Boolean,
        default: false
    },
    piscine: {
        type: Boolean,
        default: false
    },
    interphone: {
        type: Boolean,
        default: false
    },
    balcon: {
        type: Boolean,
        default: false
    },
    doucheExterne: {
        type: Boolean,
        default: false
    },
    cameraServeillance: {
        type: Boolean,
        default: false
    },
    storeElectrique: {
        type: Boolean,
        default: false
    },
    nombreChambre: {
        type: Number
    },
    nombreSalleEau: {
        type: Number
    },
    nombreSalleBain: {
        type: Number
    },
    garageParking: {
        type: Boolean,
        default: false
    },
    gardien: {
        type: Boolean,
        default: false
    },
    terrase: {
        type: Boolean,
        default: false
    },
    jardin: {
        type: Boolean,
        default: false
    },
    suite: {
        type: Boolean,
        default: false
    },
    cuisine: {
        type: Boolean,
        default: false
    },
    veranda: {
        type: Boolean,
        default: false
    },
    souSole: {
        type: Boolean,
        default: false
    },
    UserID: {
        required: true,
        type: ObjectId,
        ref: 'User',
    },
    agentId: {
        required: true,
        type: ObjectId,
        ref: 'User',
    },

});

const Categorie = mongoose.model('Categorie', bienSchema);

module.exports = Categorie;
