const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { HttpError } = require("../../helpers");

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Email verify success",
  });
};

module.exports = { verifyUser: ctrlWrapper(verifyUser) };
