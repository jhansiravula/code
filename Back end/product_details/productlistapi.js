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

var imgupload = multer({ //multer settings
    storage: imgstorage
}).single('image')


exports.addproductlist = function (req, res, next) {
    imgupload(req, res, function(err){
        if(err) {
            return res.send( "Error Uploading file" )
        }
        let product_image = req.file.path;
        req.body['product_image'] = product_image;
        //if sub-category is null
       if( req.body['sub_categories_id'] == '') req.body['sub_categories_id'] = null;
       //----
   console.log("Body: ",req.body);
    var sql = "INSERT INTO `product_list` SET ?";
    connection.query(sql, req.body, function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
    })
  })
}

// exports.getproductlist = function (req, res, next) {
//     var sql = "SELECT * FROM product_list";
//     connection.query(sql, function (err, results) {
//         if (err) throw err;
//         res.status(200).send({ data: results });
//     })
// }


exports.getproductlist = function(req,res,next) {
    var sql = `SELECT pl.product_id, pl.product_name,pl.product_image,pl.product_description, pl.sub_categories_id, pl.categories_id, pl.brand_id,
    (select psc.sub_categories_details from product_sub_categories psc where psc.sub_categories_id=pl.sub_categories_id ) as sub_categories_details,
    (select pc.categories_name from product_categories pc where pc.categories_id = pl.categories_id) as categories_name,
    (select bd.brand_name from brands bd where bd.brand_id = pl.brand_id) as brand_name FROM product_list pl`;
    connection.query(sql,function(err,results){
        if(err) throw err;
        res.send({data:results});
    })
}

//Get Product details by id
exports.getproductlistid = function (req, res, next) {
    let sub_categories_id = req.params.subcategoryId
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT * FROM product_list WHERE sub_categories_id=? and categories_id=? and brand_id=? ";
    connection.query(sql,[sub_categories_id,categories_id,brand_id ], function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
    })
}

exports.getproductid = function (req, res, next) {
    let product_id = req.params.productId
    let sub_categories_id = req.params.subcategoryId
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT * FROM product_list WHERE product_id=? and sub_categories_id=? and categories_id=? and brand_id=? ";
    connection.query(sql,[product_id,sub_categories_id,categories_id,brand_id ], function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
    })
}

exports.getproducts = function (req, res, next) {
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT * FROM product_list WHERE  categories_id=? and brand_id=? ";
    connection.query(sql,[categories_id,brand_id ], function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
    })
}

exports.getdetails = function (req, res, next) {
    let product_id = req.params.productId
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT * FROM product_list WHERE  product_id=?  ";
    connection.query(sql,[product_id], function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
    })
}


exports.updateproductlist = function (req, res, next) {
    // if(!req.file.path){
    imgupload(req, res, function(err){
        if(err) {
            return res.send( "Error Uploading file" )
        }
    product_id = req.body.product_id,
    product_name = req.body.product_name,
    product_image= req.file.path;
    product_description=req.body.product_description;
    // categories_id=req.body.categories_id;
    // sub_categories_id = req.body.sub_categories_id;
    var sql = "UPDATE product_list SET product_name= ?,product_image=?,product_description=? WHERE product_id = ?";
    connection.query(sql, [product_name,product_image,product_description, product_id], function (err, results) {
        if (err) throw err;
        res.status(200).send({ data: results });
     })
   })
}
// }
//  else{
//     product_id = req.body.product_id,
//     product_name = req.body.product_name,
//     product_image= req.file.path;
//     product_description=req.body.product_description;

//     var sql = "UPDATE product_list SET product_name= ?,product_image=?,product_description=? WHERE product_id = ?";
//     connection.query(sql, [product_name,product_image,product_description, product_id], function (err, results) {
//         if (err) throw err;
//         res.status(200).send({ data: results });
//      }) 
//  }
// }


 
exports.deleteproductlist = function (req, res, next) {
    product_id = req.params.detailsId
       
    var sql = "DELETE FROM product_list WHERE product_id= ?";
    connection.query(sql, [product_id], function (err, results) {
        if (err) throw err;
        res.status(200).send({ message: "Record Deleted." });
    })
}