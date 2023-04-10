const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw HttpError(404, `Request failed`);
  }
  res.json(result);
};

module.exports = { getListContacts: ctrlWrapper(getListContacts) };
