const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const factory = require('./handlerFactory');


exports.AjouterClient = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    if (req.files) req.body.photo = req.files[0].filename
   
     req.body.UserID = req.user.id
    const client = await Client.create(req.body)
    if(!client) {
        return next (new AppError("Error lors de lajout de client",400))
    }
    res.status(200).send({
        data:client,
        result:client.length
    })
})


exports.GetListeClient = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeClient = await Client.find({UserID:req.user.id});
    if(!listeClient) {
        return next (new AppError("Eroor lors de get liste des client",400))
    }
    res.status(200).send({
        data:listeClient,
        result:listeClient.length
    })
})

exports.GetAll = catchAsync(async(req,res,next) =>{
    if(!req.user.id) {
        return next (new AppError("vérifier votre token",401))
    }
    const listeClient = await Client.find().populate({path: 'agence'});
    if(!listeClient) {
        return next (new AppError("Eroor lors de get liste des client",400))
    }
    res.status(200).send({
        data:listeClient,
        result:listeClient.length
    })
})
exports.deleteUser = factory.deleteOne(Client);
