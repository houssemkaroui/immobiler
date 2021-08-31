const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Tache = require('../models/tacheModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const factory = require('./handlerFactory');


exports.AjouterTache = catchAsync(async(req,res,next) =>{

    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
   
     req.body.UserID = req.user.id
    const tache = await Tache.create(req.body)
    if(!tache) {
        return next (new AppError("Error lors de lajout de tache",400))
    }
    res.status(200).send({
        data:tache
    })
})


exports.GetListeTache = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeTache = await Tache.find({UserID:req.user.id});
    if(!listeTache) {
        return next (new AppError("Eroor lors de get liste des taches",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    });
})

exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeTache = await Tache.find({});
    if(!listeTache) {
        return next (new AppError("Eroor lors de get liste des Tache",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    })
})
exports.deleteTache = factory.deleteOne(Tache);
