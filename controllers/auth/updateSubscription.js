const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { email } = req.params;

  console.log(req.user.email);

  if (req.user.email !== email) {
    throw HttpError(404, `Email ${email} wrong`);
  }

  const result = await User.findOneAndUpdate({ email }, req.body, {
    new: true,
  });

  res.json(result);
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
