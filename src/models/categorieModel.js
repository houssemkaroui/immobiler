
const mongoose = require('mongoose');

const bienSchema = new mongoose.Schema({
    typeBien: {
        type: String,
        required: [true, 'Please tell us your typeBien!'],
        enum: ['Maison', 'Terrain', 'Appartement', 'Local', 'Autres'],
    },
    prix: {
        type: Number,
        required: [true, 'Please tell us your price!']
    },
    photo: [String]

    ,
    reference: {
        type: Number,
        required: [true, 'Please tell us your reference!']
    },
    Description: {
        type: String,
        required: [true, 'Please tell us your Description!']
    },
    NBChambre: {
        type: Number
    },
    NbSalleEaux: {
        type: Number
    },
    NbSalleBain: {
        type: Number
    },
    FormJuridique: {
        type: String
    },
    SurfaceCouverte: {
        type: String
    },
    SurfaceTotale: {
        type: String
    },
    GarageParking: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()

    },
    UserID: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },


});

const Categorie = mongoose.model('Categorie', bienSchema);

module.exports = Categorie;
