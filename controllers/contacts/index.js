const { addNewContact } = require("./addNewContact");
const { deleteContact } = require("./deleteContact");
const { getAllPhones } = require("./getAllPhones");
const { getByIdContact } = require("./getByIdContact");
const { getListContacts } = require("./getListContacts");
const { updateContactById } = require("./updateContactById");
const { updateFavoriteById } = require("./updateFavoriteById");

module.exports = contacts = {
  getListContacts,
  getAllPhones,
  getByIdContact,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
};
