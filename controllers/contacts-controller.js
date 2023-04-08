const { ctrlWrapper } = require("../utils");
const { Contact } = require("../models");
const { HttpError } = require("../helpers");

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw HttpError(404, `Request failed`);
  }
  res.json(result);
};

const getAllPhones = async (req, res) => {
  const result = await Contact.find({}, "name phone");
  if (!result) {
    throw HttpError(404, `Request failed`);
  }
  res.json(result);
};

const getByIdContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(404, `Creation failed`);
  }
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({ message: `Contact ${id} delete success` });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getAllPhones: ctrlWrapper(getAllPhones),
  getByIdContact: ctrlWrapper(getByIdContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
