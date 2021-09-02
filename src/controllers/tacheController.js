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
    const tache = await Tache.create(req.body)
    if(!tache) {
        return next (new AppError("error lors de lajout de tache",400))
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
        return next (new AppError("error lors de get liste des taches",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    });
})

exports.getTacheafecter = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeTache = await Tache.find({statusTache:'afaire'}).sort('createdAt');
    if(!listeTache) {
        return next (new AppError("error lors de get liste des Tache",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    })
});
exports.getTacheEncour = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeTache = await Tache.find({statusTache:'encours'}).sort('createdAt');
    if(!listeTache) {
        return next (new AppError("error lors de get liste des Tache",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    })
});
exports.getTacheFini = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeTache = await Tache.find({statusTache:'fini'}).sort('createdAt');
    if(!listeTache) {
        return next (new AppError("error lors de get liste des Tache",400))
    }
    res.status(200).send({
        data:listeTache,
        result:listeTache.length
    })
});
exports.updateStautus = catchAsync(async(req,res,next) =>{
     if(!req.user.id){
         return next (new AppError('verifer votre token',401))
     }
     const updateStatus = await Tache.findByIdAndUpdate(req.params.id,{statusTache:req.body.statusTache})
     if(!updateStatus) {
         return next (new AppError('error lors de update'))
     }
     res.status(200).send({
         message:'votre et modifer'
     });
});
exports.deleteTache = factory.deleteOne(Tache);
