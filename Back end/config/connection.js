var mysql = require('mysql');

var connection = mysql.createConnection({
    // host     : '64.202.190.169',
    // user     : 'blueOceantech',
    // password : 'blueoceantech',
    // database : 'blueOcean_admin_db',
    // port: 8443

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'blue_ocean'
  });
   
  // var pool  = mysql.createPool({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : '',
  //   database : 'clickapp'
  // });
  
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  })

  module.exports=connection;