var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
app.use(cors({credentials: true}));
var connection = require('./config/connection');
var multer = require('multer');



 //start body-parser configuration
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*app.use(function (req, res, next) { //allow cross origin requests
//   // res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//   // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // res.header("Access-Control-Allow-Credentials", true);
//   // next();

res.header("Access-Control-Allow-Origin", "http://localhost:4200");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header("Access-Control-Allow-Credentials", true);
next();
});*/ 
app.use("/public/uploads/", express.static(path.join(__dirname, 'public/uploads/')));
app.use("/public/assets", express.static(path.join(__dirname, 'public/assets')));


//single image

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
}).single('image');



//ASYNC
app.post('/upload',  function (req, res) {
  imgupload(req, res, function (err) {
    console.log("Body: ",JSON.stringify(req.body));
    if(err) {
      return res.end("Error Uploading file")
    }
      res.json({message: "Image Uploaded", data: req.file})
  });

});

// app.post('/edit', function(req, res,next) {
//   let id = 6;
//   const query = 'UPDATE `brands` SET ? WHERE brand_id=?';
//   connection.query(query, [req.body, id], function(err, result){
//     if(err) {
//       return res.end("Error.........")
//     }
//     res.json({message: "Image Uploaded"})
//   });

// })

//end body-parser configuration
app.get('/', (req, res) => {
  res.send('blue_ocean App WebService')
  console.log('blue_ocean App Webservice');

});
app.listen(8081)
//create app server
/* var server = app.listen(8080,  "192.168.1.104", function () {

  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
}); */
 
var router = require('./routes');
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());//using CORS

router(app);


