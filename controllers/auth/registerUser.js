const bcrypt = require("bcryptjs");
const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `email ${email} already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };
