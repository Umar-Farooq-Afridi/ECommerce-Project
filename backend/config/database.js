const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.ECOMMERCE_MONGO_DB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);

    process.exit(1);
  }
}

module.exports = connectDB;
