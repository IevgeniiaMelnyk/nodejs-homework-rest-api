const express = require("express");

const { contacts } = require("../../controllers");

const { validateBody } = require("../../utils");

const {
  contactSchemas: { addSchema, updateFavoriteSchema },
} = require("../../models");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contacts.getListContacts);

router.get("/phone", contacts.getAllPhones);

router.get("/:id", isValidId, contacts.getByIdContact);

router.post("/", validateBody(addSchema), contacts.addNewContact);

router.put(
  "/:id",
  isValidId,
  validateBody(addSchema),
  contacts.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  contacts.updateFavoriteById
);

router.delete("/:id", isValidId, contacts.deleteContact);

module.exports = router;
