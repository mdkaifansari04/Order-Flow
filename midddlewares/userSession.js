const express = require('express')
const session = require('express-session')

let uSession;

const userSession = (req,res,next) =>{

    uSession = req.session;
    uSession.email = req.body.email;
    uSession.user = req.body.user;
    console.log(uSession);

    uSession.save((err) =>{
            if(err) return next(err)
    })
    next();
}

module.exports = userSession;