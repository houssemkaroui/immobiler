const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Categorie = require('../models/categorieModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.AjouterCategorie = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    if (req.files)
    req.body.photo=[]
    for(var i = 0; i < req.files.length; i++){
        req.body.photo.push(req.files[i].filename);
    }
     
     req.body.UserID = req.user.id
    const categorie = await Categorie.create(req.body)
    if(!categorie) {
        return next (new AppError("Error lors de lajout de categorie",400))
    }
    res.status(200).send({
        data:categorie
    })
})


exports.GetListeCategorie = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeCategories = await Categorie.find({UserID:req.user.id});
    if(!listeCategories) {
        return next (new AppError("Eroor lors de get liste des categories",400))
    }
    res.status(200).send({
        data:listeCategories,
        result:listeCategories.length
    })
})

exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeCategories = await Categorie.find({});
    if(!listeCategories) {
        return next (new AppError("Eroor lors de get liste des categories",400))
    }
    res.status(200).send({
        data:listeCategories,
        result:listeCategories.length
    })
})