const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Visite = require('../models/visiteModel');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


//consulter liste tous les viste
exports.NombreVisteByAgent = catchAsync(async (req, res, next) => {
    if (!req.user.id) {
        return next(new AppError("vérifier votre token", 401))
    }
    const nombre = await Visite.find({ agent: req.body.agent })

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tableux = []
    var counts = {};
    for (var i = 0; i < nombre.length; i++) {
        var monthName = months[nombre[i].dateFien.getMonth()]
        tableux.push(monthName)
    }
    for (var i = 0; i < tableux.length; i++) {
        var num = tableux[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
  

    res.status(200).send({
            month:Object.keys(counts),
            number:Object.values(counts)
    })

})