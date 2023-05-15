const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(
      `Connected to mongodb ${connect.connection.host}`.bgMagenta.black
    );
  } catch (error) {
    console.log(`Error in mongofb ${error}`.bgRed.black);
  }
};

module.exports = connectDB;
