const { ctrlWrapper } = require("../utils");
const contacts = require("../models");
const { HttpError } = require("../helpers");

const getListContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getByIdContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({ message: `Contact ${id} delete success` });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
};
