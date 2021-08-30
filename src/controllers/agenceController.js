const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Agence = require('../models/agenceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');



exports.AjouterAgence = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }

    const agence = await Agence.create(req.body)
    if(!agence) {
        return next (new AppError("Error lors de lajout de agence",400))
    }
    res.status(200).send({
        data:agence
    })
})



exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeAgence = await Agence.find({});
    if(!listeAgence) {
        return next (new AppError("Eroor lors de get liste des categories",400))
    }
    res.status(200).send({
        data:listeAgence,
        result:listeAgence.length
    })
})
exports.deleteUser = factory.deleteOne(Agence);
