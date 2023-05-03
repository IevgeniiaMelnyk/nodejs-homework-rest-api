const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrentUser } = require("./getCurrentUser");
const { logoutUser } = require("./logoutUser");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyUser } = require("./verifyUser");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerifyEmail,
};
