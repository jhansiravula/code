var connection = require('../config/connection');
var multer = require('multer');

var imgstorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/uploads');
        },
        filename: function (req,file, cb) {
          console.log("File: ", file)
            cb(null, file.originalname);
        }
      });

      var upload = multer({ storage: imgstorage }).fields([{name:"pp"},{name: "banner"}]);

      exports.addtest = function (req, res, next) {
        upload(req, res, function (err) {
             if (err) {
                 return res.send("Error Uploading files")
             } 
             console.log(req.files.pp)
             let id = req.body.id;
             let name = req.body.name;
             let image;
             let test_image;
             if(req.files.pp.length >0) {
             image = req.files.pp[0].path;
             }
             if(req.files.banner.length >0) {
              test_image = req.files.banner[0].path;
              }
               
       
        
             var sql = "INSERT INTO `test` VALUES (?,?,?,?)";
             connection.query(sql, [id, name, image, test_image], function (err, results) {
                 if (err) throw err;
                 res.status(200).send({ message: "Image Uploaded", data: req.files });                
             })             
         });     
          
        }


        exports.adddesc  = function( req,res,next){
          let desc_id = req.body.desc_id;
          let desc_name = req.body.desc_name;
          let desc_description = req.body.desc_description;
          var sql  ="INSERT INTO `desc` VALUES (?,?,?)";
          connection.query(sql,[desc_id,desc_name,desc_description],function (err,results){
            if(err) throw err;
            res.status(200).send({data:results});
            
          })
        }


        exports.getdesc = function (req, res, next) {
          var sql = "SELECT * FROM `desc`";
          connection.query(sql, function (err, results) {
              if (err) throw err;
              res.send({ data: results })
          })
      }
      
      