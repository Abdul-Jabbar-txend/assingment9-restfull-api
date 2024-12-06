// /config/db.js

const mongoose = require("mongoose");
require("dotenv").config(); // Load the .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.mongoURI; // Access the MongoDB URI from the environment variables
    if (!mongoURI) {
      console.error("MongoDB URI is not defined in .env file");
      process.exit(1);
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
