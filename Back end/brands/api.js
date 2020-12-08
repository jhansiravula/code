var connection = require('../config/connection');
var multer = require('multer');


var imgstorage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("File: ", file)
        cb(null, file.originalname);
    }
});

// var imgupload = multer({ //multer settings
//         storage: imgstorage}).fields([{name:"logo"},{name:"image"}])

var imgupload = multer({ //multer settings
    storage: imgstorage
}).single('image')


exports.addbrands = function (req, res, next) {
    imgupload(req, res, function (err) {
        if (err) {
            return res.send("Error Uploading file")
        } 
      //  console.log(req.files.logo);
        let brand_id = req.body.brand_id;
        let brand_name = req.body.brand_name;
        // let images;
        // if(req.files.logo.length>0){
        //     images=req.files.logo[0].path
        // }
        // let description = req.body.description;
        // let brand_image;
        // if(req.files.image.length>0){
        //     brand_image = req.files.image[0].path
        // }
        let images = req.file.path;
     
        var sql = "INSERT INTO `brands`  VALUES  (?,?,?)";
        connection.query(sql, [brand_id, brand_name, images], function (err, results) {
            if (err) throw err;
            res.status(200).send({ message: "Image Uploaded", data: req.files });
        })
       
    });
}


exports.getBrandsId = function(req,res,next){
    let brand_id = req.params.brandId
    let brand_name =req.params.brandName
    console.log(req.params.brandId);
    var sql = "SELECT * FROM brands WHERE brand_id=?";
    connection.query(sql,[brand_id],function(err,results) {
        if(err) throw err;
        res.send({data:results});
    })
}

exports.getbrands = function (req, res, next) {
    var sql = "SELECT * FROM brands";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send({ data: results })
    })
}

exports.updatebrands = function (req, res, next) {
    console.log(req)

    if (!req.file.path) {
        upload(req, res, function (err) {
            if (err) {
                return res.send("Error Uploading file")
            }
            let brand_id = req.body.brand_id;
            let brand_name = req.body.brand_name;
            let images = req.file.path;
            let description = req.body.description;
            let brand_image = req.file.path;
            var sql = "UPDATE brands SET brand_name = ?,images=?,description=?  WHERE brand_id= ?";
            connection.query(sql, [brand_name, images, description,brand_image, brand_id], function (err, results) {
                if (err) throw err;
                res.status(200).send({ data: results });
            })
        })
    }
    else {
        let brand_id = req.body.brand_id;
        let brand_name = req.body.brand_name;
        let images = req.file.path;
        let description = req.body.description;
        let brand_image = req.file.path;
        var sql = "UPDATE brands SET brand_name = ?,images=?,description=?  WHERE brand_id= ?";
        connection.query(sql, [brand_name, images, description,brand_image, brand_id], function (err, results) {
            if (err) throw err;
            res.status(200).send({ data: results });
        })
    }

}

exports.deletebrands = function (req, res, next) {
    console.log(req.params.brandId);
    brand_id = req.params.brandId;

    var sql = "DELETE FROM brands WHERE brand_id = ?";
    connection.query(sql, [brand_id], function (err, results) {
        if (err) throw err;
        res.status(200).send({ message: "Record Deleted." });
    })
}







