var connection = require('../config/connection');
var multer = require('multer');

// var imgstorage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb) {
//         console.log("File: ", file)
//         cb(null, file.originalname);
//     }
// });

// var imgupload = multer({ //multer settings
//     storage: imgstorage
// }).single('image')


exports.addcategories = function (req, res, next) {
        console.log("id"+req.body.categories_id)
        let categories_id = req.body.categories_id;
        let categories_name = req.body.categories_name;
        let brand_id = req.body.brand_id;
        console.log( req.body.categories_id);
        console.log(req.body.categories_name);
        console.log(req.body.brand_id);
        var sql = "INSERT INTO `product_categories` VALUES (?,?,?)";
        connection.query(sql, [categories_id, categories_name, brand_id], function (err, results) {
            if (err) throw err;
            console.log(err)
            res.status(200).send({ data: results });
        })
}


//Get Categories by id
exports.getcategories = function (req, res, next) {
    console.log("Params: ", req.params);
    // categories_id = req.body.categories
    let brand_id = req.params.brandId
    var sql = "SELECT * FROM `product_categories` WHERE brand_id=?";
    connection.query(sql, [brand_id], function (err, results) {
        if (err) throw err;
        res.send({ data: results })
    })
}

//Get categories
exports.getcategorieslist = function (req, res, next) {
    var sql = `SELECT pc.categories_id,pc.brand_id, pc.categories_name, 
(select bd.brand_name from brands bd where bd.brand_id = pc.brand_id) as brand_name FROM product_categories pc`;
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send({ data: results })
    })
}

exports.updatecategories = function (req, res, next) {
    if (!req.file.path) {
        imgupload(req, res, function (err) {
            if (err) {
                return res.send("Error Uploading file")
            }
                categories_id = req.body.categories_id,
                categories_name = req.body.categories_name
                // categories_images = req.body.categories_images,
                // categories_description = req.body.categories_description

            var sql = "UPDATE product_categories SET categories_name= ? WHERE categories_id = ?";
            connection.query(sql, [categories_name, categories_id], function (err, results) {
                if (err) throw err;
                res.status(200).send({ data: results });
            })
        })
    }
    else {
        categories_id = req.body.categories_id,
            categories_name = req.body.categories_name,
            categories_images = req.body.categories_images,
            categories_description = req.body.categories_description

        var sql = "UPDATE product_categories SET categories_name= ? WHERE categories_id = ?";
        connection.query(sql, [categories_name, categories_id, categories_images, categories_description], function (err, results) {
            if (err) throw err;
            res.status(200).send({ data: results });
        })
    }
}



exports.deletecategories = function (req, res, next) {
    let categories_id = req.params.categoryId;
    var sql = "DELETE FROM product_categories WHERE categories_id= ?";
    connection.query(sql, [categories_id], function (err, results) {
        if (err) throw err;
        res.status(200).send({ message: "Record Deleted" });
    })
}