const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Visite = require('../models/visiteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const factory = require('./handlerFactory');


exports.AjouterVisite = catchAsync(async(req,res,next) =>{

    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
   
     req.body.UserID = req.user.id
    const visite = await Visite.create(req.body)
    if(!visite) {
        return next (new AppError("Error lors de lajout de visite",400))
    }
    res.status(200).send({
        data:visite
    })
})


exports.GetListeVisite = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeVisite = await Visite.find({UserID:req.user.id});
    if(!listeVisite) {
        return next (new AppError("Eroor lors de get liste des visite",400))
    }
    res.status(200).send({
        data:listeVisite,
        result:listeVisite.length
    });
})

exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeVisite = await Visite.find({}).populate({path: 'agent'});
    if(!listeVisite) {
        return next (new AppError("Eroor lors de get liste des visite",400))
    }
    res.status(200).send({
        data:listeVisite,
        result:listeVisite.length
    })
})
exports.deleteUser = factory.deleteOne(Visite);
