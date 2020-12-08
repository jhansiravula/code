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


exports.addspecifications = function (req, res, next) { 
    imgupload(req, res, function(err){
        if(err) {
            return res.send( "Error Uploading file" )
        }
        let specification_images= req.file.path;
        req.body['specification_images'] = specification_images;     
   console.log("Body: ",req.body);
    var sql = "INSERT INTO `product_specifications` SET ?";
    connection.query(sql, req.body, function (err, results) {
        if (err) throw err;
        res.send({ data: results });
    })
  })
}



//Get Product Specifications
// exports.getspecifications = function (req, res, next) {
//     var sql = "SELECT * FROM product_specifications";
//     connection.query(sql, function (err, results) {
//         if (err) throw err;
//         res.status(200).send({ data: results });
//     })
// }


exports.getspecifications = function(req,res,next){
    var sql = `SELECT ps.specification_id, ps.specification_name, ps.specification_images, ps.specification_desc, ps.product_id, ps.sub_categories_id, ps.categories_id, ps.brand_id,
    (select pl.product_name from product_list pl where pl.product_id=ps.product_id ) as product_name,
    (select psc.sub_categories_details from product_sub_categories psc where psc.sub_categories_id=ps.sub_categories_id ) as sub_categories_details,
    (select pc.categories_name from product_categories pc where pc.categories_id = ps.categories_id) as categories_name,
    (select bd.brand_name from brands bd where bd.brand_id = ps.brand_id) as brand_name FROM product_specifications ps`;
    connection.query(sql,function(err,results){
        if(err) throw err;
        res.send({data:results});
    })
}


//Get specifications by id
exports.getspecid = function (req, res, next){
    let product_id = req.params.productId
    let sub_categories_id = req.params.subcategoryId
    let categories_id = req.params.categoryId
    let brand_id = req.params.brandId
    var sql = "SELECT *FROM product_specifications WHERE product_id=? and sub_categories_id and categories_id and brand_id";
    connection.query(sql,[product_id,sub_categories_id,categories_id,brand_id], function (err,results){
        if (err) throw err;
        res.status(200).send({data: results});
    })
}