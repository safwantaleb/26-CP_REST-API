const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" });

function connectDB() {
  const uri = process.env.MONGO_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  
  mongoose
    .connect(uri, options)
    .then(() => console.log("Database is connected successfully"))
    .catch(() => console.error("Error to connect to the Database!"));
}

module.exports = connectDB;
