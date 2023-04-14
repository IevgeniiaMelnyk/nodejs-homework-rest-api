const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

module.exports = { logoutUser: ctrlWrapper(logoutUser) };
