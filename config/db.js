const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
  });

const connectDB = async()=>{
    try{
        await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: "test"
        });
        console.log('DB Connected')
    }catch(err){
        console.log(err);
    }

}

module.exports = conn