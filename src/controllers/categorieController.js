const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Categorie = require('../models/categorieModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


// ajouter une bien
exports.AjouterCategorie = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    console.log(req.files)
    if (req.files)
    req.body.photo=[]
    for(var i = 0; i < req.files.length; i++){
        req.body.photo.push(req.files[i].filename);
    }
     
     req.body.UserID = req.user.id
    const categorie = await Categorie.create(req.body)
    if(!categorie) {
        return next (new AppError("error lors de lajout de categorie",400))
    }
    res.status(200).send({
        data:categorie
    })
})

//consulter liste bien by agent
exports.GetListeCategorie = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeCategories = await Categorie.find({UserID:req.user.id});
    if(!listeCategories) {
        return next (new AppError("error lors de get liste des categories",400))
    }
    res.status(200).send({
        data:listeCategories,
        result:listeCategories.length
    })
})
//consulter tous les bien
exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeCategories = await Categorie.find({});
    if(!listeCategories) {
        return next (new AppError("error lors de get liste des categories",400))
    }
    res.status(200).send({
        data:listeCategories,
        result:listeCategories.length
    })
})
//supprimer une bien
exports.deleteBien = factory.deleteOne(Categorie);
