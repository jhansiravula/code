var AuthenticationController = require('./controllers/authentication');
var BrandsController = require('./brands/api');
var CategoriesController = require('./product_categories/categoriesapi');
// var CategoriesController = require('./product_categories/categories');
var SubCategoriesController = require('./product_sub_categories/subcat_api');
//var ProductDetailsController = require('./product_details/detailsapi');
var ProductDetailsController = require('./product_details/productlistapi');
var ProductSpecificationController = require('./product_specification/specificationapi');
var ContactDetailsController = require('./contact/contact_details');
var MultiImageController = require('./multi_image/test');
var express = require('express');
var passportService = require('./config/passport');

var passport = require('passport');
var requireAuthUser = passport.authenticate('jwt.user', { session: false });
var requireLogin = passport.authenticate('local.user', { session: false });

module.exports = function (app) {

  var apiRoutes = express.Router(),
    authRoutes = express.Router();


  // User Auth Routes
  apiRoutes.use('/auth', authRoutes);

 
  
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  //Brands
  authRoutes.post('/addbrands',BrandsController.addbrands);
  authRoutes.get('/getbrands',BrandsController.getbrands);
  authRoutes.put('/updatebrands',BrandsController.updatebrands);
  authRoutes.delete('/deletebrands/:brandId',BrandsController.deletebrands);
  authRoutes.get('/getbrandsid/:brandId',BrandsController.getBrandsId);

  //Categories
  authRoutes.post('/addcategories',CategoriesController.addcategories);
  authRoutes.get('/getcategories/:brandId',CategoriesController.getcategories);
  authRoutes.get('/getcategories',CategoriesController.getcategorieslist);
  authRoutes.put('/updatecategories',CategoriesController.updatecategories);
  authRoutes.delete('/deletecategories/:categoryId',CategoriesController.deletecategories);

  //Sub-Categories
  authRoutes.post('/addsubcategories',SubCategoriesController.addsubcategories);
  authRoutes.get('/getsubcategories/:categoryId/:brandId',SubCategoriesController.getsubcategories);
  authRoutes.delete('/deletesubcategories/:subcatId',SubCategoriesController.deletesubcategories);
  authRoutes.put('/updatesubcategories',SubCategoriesController.updatesubcategories);
  authRoutes.get('/getsubcategories',SubCategoriesController.getsubcategorieslist);

  //Product-Details
  authRoutes.post('/addproductlist',ProductDetailsController.addproductlist);
  authRoutes.get('/getproductlist',ProductDetailsController.getproductlist);
  authRoutes.put('/updateproductlist',ProductDetailsController.updateproductlist);
  authRoutes.delete('/deleteproductlist/:detailsId',ProductDetailsController.deleteproductlist);
  authRoutes.get('/getproductlist/:subcategoryId/:categoryId/:brandId',ProductDetailsController.getproductlistid);
  authRoutes.get('/getproducts/:categoryId/:brandId', ProductDetailsController.getproducts);
  authRoutes.get('/getproductlist/:productId/:subcategoryId/:categoryId/:brandId',ProductDetailsController.getproductid);
  authRoutes.get('/getdetail/:productId',ProductDetailsController.getdetails);
  
  //Product Specifications
  authRoutes.post('/addproductspec',ProductSpecificationController.addspecifications);
  authRoutes.get('/getproductspec',ProductSpecificationController.getspecifications);
  authRoutes.put('/editspec',ProductSpecificationController.getspecifications);
  authRoutes.get('/getspec/:productId/:subcategoryId/:categoryId/:brandId',ProductSpecificationController.getspecid);

  //Contact Details

  authRoutes.post('/addcontactdetails',ContactDetailsController.addcontact);
  authRoutes.get('/getcontactdetails', ContactDetailsController.getcontact);
  authRoutes.delete('/deletecontactdetails/:personId',ContactDetailsController.deletecontact);
  authRoutes.post('/sendtomail',ContactDetailsController.contactDetails);

  //test
  authRoutes.post('/test',MultiImageController.addtest);
  authRoutes.post('/desc',MultiImageController.adddesc);
  authRoutes.get('/getdescr',MultiImageController.getdesc);

  // authRoutes.post('/verifymail', AuthenticationController.verifymail);


  // authRoutes.post('/loginstatus', AuthenticationController.changeloginstatus);

  // authRoutes.post('/forgotpassword', AuthenticationController.ForgotPassword);
  // authRoutes.get('/reset/:token', AuthenticationController.checkTokenExists);
  // authRoutes.post('/reset/:token', AuthenticationController.postToken);



  authRoutes.get('/protected', requireAuthUser, function (req, res) {

    console.log('HEEEELllll');
    res.send({ content: 'Success' });


  });
  app.use('/api', apiRoutes);
  console.log('Inside Routes');

}
