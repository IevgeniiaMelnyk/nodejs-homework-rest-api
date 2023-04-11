const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

const connectDB = async (DB_HOST, PORT) => {
  try {
    const connectSuccess = await mongoose.connect(DB_HOST);
    if (connectSuccess) {
      app.listen(PORT, () => {
        console.log(
          `Database connection successful. Server running. Use our API on port: ${PORT}`
            .rainbow
        );
      });
    }
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`.red);
    process.exit(1);
  }
};
connectDB(DB_HOST, PORT);
