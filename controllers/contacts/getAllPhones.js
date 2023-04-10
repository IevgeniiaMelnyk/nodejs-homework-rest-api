const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllPhones = async (req, res) => {
  const result = await Contact.find({}, "name phone");
  if (!result) {
    throw HttpError(404, `Request failed`);
  }
  res.json(result);
};

module.exports = { getAllPhones: ctrlWrapper(getAllPhones) };
