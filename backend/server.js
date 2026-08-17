require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("\n=============================================");
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("=============================================\n");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
