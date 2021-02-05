const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// const mysql = require("mysql")

// const connectDb = async () => {
//   try {
//     //Create connection
//     const db = await mysql.createConnection({
//       host:"localhost",
//       user:"root",
//       password:"",
      // database: "hosteller"
    // });

    //Connect
    // await db.connect(() => {
    //   console.log("Mysql connected....")
    // })

    // let sql = "CREATE DATABASE hosteller";
    // const result = await db.query(sql)
    // console.log(`Database created...... ${result}`)
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };




module.exports = connectDb;
