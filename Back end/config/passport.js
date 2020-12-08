var passport = require('passport');
var connection = require('./connection');
var crypto = require('crypto');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

// login with facebook
// var Strategy = require('passport-facebook').Strategy;
// var express = require('express');
// passport.use(new Strategy({
//     clientID:"619248442762-ace62nuo2lmrdd48qa2i431ohj2sjlea.apps.googleusercontent.com",
//     clientSecret:"JX-4gsXu9u21XN-tMlEPdIa9",
//     callbackURL: 'http://localhost:3000/login/facebook/return'
//   },
//   function(accessToken, refreshToken, profile, cb) {
   
//     return cb(null, profile);
//   }));






var localOptions = {
    usernameField: 'emailid'
};

var localLogin = new LocalStrategy(localOptions, function (emailid, password, done) {

    console.log('Email is ' + emailid);
    console.log('password is ' + password);
    // console.log('OTP  is '+OTP);
    var finalPassword = crypto.createHash('md5').update(password).digest('hex');

    console.log('password is ' + finalPassword);
    //Check if Email Exists in DB
    var query = connection.query('select * from login where email=?', [emailid], function (err, result) {
    
        if (err) {
            return done(err);
        }
        console.log("Lenght: " + result.length)
        if (result.length == 0) {
            console.log("Step 0")
            return done(null, false, { error: 'Login failed. Please try again.' });

        }
   
        if (result.length == 1) {
            //Check if Password exits in DB 
            console.log("Step 1")
            var query1 = connection.query('select * from login where email=? and password=? ', [emailid, finalPassword], function (err, result1) {
                if (err) {
                    return done(err);   
                }
                console.log("Lenght step 1: " + result1.length)
                if (result1.length!=0){
                    result1.forEach(function (item) {
                        console.log(item);
                        return done(null, item)
                    })
                }
                else if (result1.length == 0) {
                    return done(null, false, { error: 'Login failed. Please try again.' });
                }
               
                //console.log(result1);

                // return done(null, result1);

            });
        }
    });
})



//User Section

var jwtOptions = {
    // jwtFromRequest: ExtractJwt.fromAuthHeader(),
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
};


var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

    console.log('Inside JWT LOGIN with ID ' + payload.id);

    var query = connection.query('select * from login where login_id=?', [payload.id], function (err, result) {
        console.log('I AM HERE');
        done(null, result);
    })

    /*   User.findById(payload._id, function(err, user){
  
          if(err){
              return done(err, false);
          }
  
          if(user){
              done(null, user);
          } else {
              done(null, false);
          }
  
      }); */

});


//JWT
passport.use('jwt.user', jwtLogin);

//Local Login
passport.use('local.user', localLogin);


