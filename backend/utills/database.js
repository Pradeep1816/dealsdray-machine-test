const mongoose = require("mongoose");

// local database connection

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/employee");
    console.log(`connected to mongodb ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
