const { ctrlWrapper } = require("../../utils");

const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

module.exports = { getCurrentUser: ctrlWrapper(getCurrentUser) };
