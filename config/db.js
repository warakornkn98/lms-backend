const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lms"
  });

const connectDB = async()=>{
    try{
        await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: "lms"
        });
        console.log('DB Connected')
    }catch(err){
        console.log(err);
    }

}

module.exports = conn