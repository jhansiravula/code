var connection = require('../config/connection');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


exports.addcontact = function (req, res, next) {
    let person_id = req.body.person_id;
    let full_name = req.body.full_name;
    let email = req.body.email;
    let mobile_no = req.body.mobile_no;
    let message = req.body.message;
    var sql = "INSERT INTO contact_details VALUES (?,?,?,?,?)";
    connection.query(sql, [person_id, full_name, email, mobile_no, message], function (err, results) {
        if (err) throw err;
        res.status(200).send({ message: 'record inserted' });
    })

}

exports.getcontact = function (req, res, next) {
    var sql = "SELECT * FROM  contact_details";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send({ data: results });
    })
}

exports.deletecontact = function (req,res,next) {
    let person_id = req.params.personId;
    var sql = "DELETE FROM contact_details WHERE person_id=?";
    connection.query(sql,[person_id],function(err,results){
        if(err) throw err;
        res.status(200).send({ message: "Record Deleted"});
    })
}


exports.contactDetails = function(req, res, next){
    // var options = {
    //     auth: {
    //         user: 'anugna',
    //          key: '1234'
    //     }
    //   }

    //     var sendEmailto = {
    //         full_name :req.body.full_name,
    //         email:req.body.email,
    //         mobile_no:req.body.mobile_no,
    //         message:req.body.message
            
             
    //    }
    //    console.log('SEND MAIL DATA ', sendEmailto);


    // if (!sendEmailto.email) {
    //     return next(res.json({"Status":"Failed","Message":"To Email is Required"}));
    // };

    //   var emailInfo = {
    //     from:  sendEmailto.email,
    //     
    //     subject:'Contact Form Details',
    //     html: '<p>Your html here</p>',// plain text body
    //     text:' Contact Form Details: \n\n'+
    //         'First Name :'  +  sendEmailto.full_name +'\n\n'+
    //         'Email      :'  +  sendEmailto.email +' \n\n'+
    //         'Phone      :'  +  sendEmailto.mobile_no +' \n\n'+
    //         'Comments   :'  +  sendEmailto.message
        
    //   };
    
    //   transporter.sendMail(emailInfo, function(err, info){
    //       if (err ){
    //           console.log("i am getting error")
    //         console.log(err);
    //       }
    //       else {
    //         console.log('Message sent: ' + info);
    //       }
    //   });

  
    
    var options = {
        auth: {
            api_user: 'tejoma',
            api_key: 'T3j0m@16'
        }
    }

    var sendEmailto = {
        full_name :req.body.full_name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        message:req.body.message      
   }
   console.log('SEND MAIL DATA ', sendEmailto);
    var client = nodemailer.createTransport(sgTransport(options));
    var emailopt = {
        from: 'tejoma.technologies@gmail.com',
        to: 'anugna.bhogavilli@gmail.com',
        subject: 'Contact Form Details',
        // html: '<p>Some text message </p>',
        html:' Contact Form Details: \n\n'+
        'firstName :'  +  sendEmailto.full_name +'\n\n'+
        'eMail      :'  +  sendEmailto.email +' \n\n'+
        'telephone  :'  +  sendEmailto.mobile_no +' \n\n'+
        'comments   :'  +  sendEmailto.message
    };
    client.sendMail(emailopt, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent: ' , emailopt);
            //res.json({'message':'Email was sent'});
        }
    });
}
