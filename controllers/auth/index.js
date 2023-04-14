const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrentUser } = require("./getCurrentUser");
const { logoutUser } = require("./logoutUser");
const { updateSubscription } = require("./updateSubscription");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscription,
};
