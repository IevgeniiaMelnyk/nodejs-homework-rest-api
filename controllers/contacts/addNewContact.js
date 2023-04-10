const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(404, `Creation failed`);
  }
  res.status(201).json(result);
};

module.exports = { addNewContact: ctrlWrapper(addNewContact) };
