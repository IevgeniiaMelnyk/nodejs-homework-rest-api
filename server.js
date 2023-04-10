const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

const connectDB = async (DB_HOST, PORT) => {
  try {
    const connectSuccess = await mongoose.connect(DB_HOST);
    if (connectSuccess) {
      app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    }
  } catch (error) {
    return error.message;
  }
};
connectDB(DB_HOST, PORT);

// mongoose
//   .connect(DB_HOST)
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     })
//   )
//   .catch((error) => error.message);
