const express = require("express");

const { contacts } = require("../../controllers");

const { validateBody } = require("../../utils");

const {
  contactSchemas: { addSchema, updateFavoriteSchema },
} = require("../../models");

const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contacts.getListContacts);

router.get("/phone", authenticate, contacts.getAllPhones);

router.get("/:id", authenticate, isValidId, contacts.getByIdContact);

router.post("/", authenticate, validateBody(addSchema), contacts.addNewContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addSchema),
  contacts.updateContactById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contacts.updateFavoriteById
);

router.delete("/:id", authenticate, isValidId, contacts.deleteContact);

module.exports = router;
