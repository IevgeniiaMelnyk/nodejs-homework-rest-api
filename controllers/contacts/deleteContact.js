const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;
  const contact = await Contact.findById(id);
  if (contact.owner.toString() !== owner.toString()) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json({ message: `Contact ${id} delete success` });
};

module.exports = { deleteContact: ctrlWrapper(deleteContact) };
