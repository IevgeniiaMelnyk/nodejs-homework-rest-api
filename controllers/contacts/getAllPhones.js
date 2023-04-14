const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllPhones = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "name phone", {
    skip,
    limit,
  }).populate("owner", "name email");
  if (!result) {
    throw HttpError(404, `Request failed`);
  }
  res.json(result);
};

module.exports = { getAllPhones: ctrlWrapper(getAllPhones) };
