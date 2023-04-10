const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

module.exports = { updateFavoriteById: ctrlWrapper(updateFavoriteById) };
