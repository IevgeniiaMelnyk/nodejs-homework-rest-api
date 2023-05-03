require("dotenv").config();
const { BASE_URL } = process.env;
const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    console.log(user.verify);
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Email resend success",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
