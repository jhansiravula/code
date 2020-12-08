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

exports.addsubcategories = function(req,res,next) {
    imgupload(req, res, function(err){
        if(err){
            return res.send("Error Uploading file")
        }
    
    let sub_categories_id=req.body.sub_categories_id;
    let sub_categories_details=req.body.sub_categories_details;
    let categories_id=req.body.categories_id;
    let brand_id= req.body.brand_id;
    let images = req.file.path;
    let subcat_description = req.body.subcat_description;
    var sql = "INSERT INTO product_sub_categories VALUES  (?,?,?,?,?,?)";
    connection.query(sql,[sub_categories_id,sub_categories_details,categories_id,brand_id,images,subcat_description],function(err,results){
        if(err) throw err;
        res.status(200).send({ message: "Image Uploaded", data: req.file })
    })
  })
}

//Get Sub-Categories
// exports.getsubcategorieslist = function(req,res,next) {
//     var sql = "SELECT *FROM product_sub_categories";
//     connection.query(sql,function(err,results){
//         if(err) throw err;
//         res.send({data:results});
//     })
// }

//Get Sub-Categories
exports.getsubcategorieslist = function(req,res,next) {
    var sql = `SELECT psc.sub_categories_id, psc.sub_categories_details,psc.categories_id,psc.brand_id, psc.images, psc.subcat_description,
    (select pc.categories_name from product_categories pc where pc.categories_id = psc.categories_id) as categories_name,
    (select bd.brand_name from brands bd where bd.brand_id = psc.brand_id) as brand_name FROM product_sub_categories psc`;
    connection.query(sql,function(err,results){
        if(err) throw err;
        res.send({data:results});
    })
}

//Get Sub-Categories by id
exports.getsubcategories = function(req,res,next) {
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT *FROM product_sub_categories WHERE categories_id=? and brand_id=?";
    connection.query(sql,[categories_id,brand_id],function(err,results) {
        if(err) throw err;
        res.send({data:results});
    })
}
exports.updatesubcategories = function(req,res,next) {
    if(!req.file.path){
    imgupload(req, res, function(err){
        if(err){
            return res.send("Error Uploading file")
        }
    sub_categories_id = req.body.sub_categories_id,
    sub_categories_details = req.body.sub_categories_details,
    categories_id = req.body.categories_id,
    images = req.file.path,
    subcat_description = req.body.subcat_description
    var sql = "UPDATE product_sub_categories SET sub_categories_details= ?,categories_id=?,images=?,subcat_description=? WHERE sub_categories_id = ?";
    connection.query(sql,[sub_categories_details,categories_id,images,subcat_description,sub_categories_id],function(err,results){
        if(err) throw err;
        res.status(200).send({ data: results });
    })
  }) 
 }
 else{
    sub_categories_id = req.body.sub_categories_id,
    sub_categories_details = req.body.sub_categories_details,
    categories_id = req.body.categories_id,
    images = req.file.path,
    subcat_description = req.body.subcat_description
    var sql = "UPDATE product_sub_categories SET sub_categories_details= ?,categories_id=?,images=?,subcat_description=? WHERE sub_categories_id = ?";
    connection.query(sql,[sub_categories_details,categories_id,images,subcat_description,sub_categories_id],function(err,results){
        if(err) throw err;
        res.status(200).send({ data: results });
    })
 }
}

//Delete
exports.deletesubcategories = function(req,res,next) {
    console.log(req.params.subcatId);
    sub_categories_id = req.params.subcatId;
    var sql = "DELETE FROM product_sub_categories WHERE  sub_categories_id= ?";
    connection.query(sql,[sub_categories_id],function(err,results){
        if(err) throw err;
        res.status(200).send({ message: "Record Deleted." });
    })
}