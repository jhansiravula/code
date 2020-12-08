
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var authConfig = require('../config/auth');
var connection = require('../config/connection');

// var fs = require('fs');
// var rand = require('unique-random')(10000, 99999);
// var async = require('async');
// var nodemailer = require('nodemailer');
// var sgTransport = require('nodemailer-sendgrid-transport');
function generateToken(user) {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: '90m'
    });
}

function setUserInfo(request) {
    return {
        login_id: request.login_id,
        email: request.email,
        password:request.password
    
        // role: request.role
    };
}

//Login
exports.login = function (req, res, next) {

    console.log('I am HERE IN LOGIN');
    console.log(req.user)
    var userInfo = setUserInfo(req.user);
    console.log(JSON.stringify(userInfo,null,4))

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });

}



