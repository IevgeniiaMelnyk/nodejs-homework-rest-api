const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
require("dotenv").config();
const { nanoid } = require("nanoid");
const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `email ${email} already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
    avatarURL: result.avatarURL,
  });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };
