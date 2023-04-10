const express = require("express");

const { contacts } = require("../../controllers");

const { validateBody } = require("../../utils");

const {
  schemas: { addSchema, updateFavoriteSchema },
} = require("../../models");

const router = express.Router();

router.get("/", contacts.getListContacts);

router.get("/phone", contacts.getAllPhones);

router.get("/:id", contacts.getByIdContact);

router.post("/", validateBody(addSchema), contacts.addNewContact);

router.put("/:id", validateBody(addSchema), contacts.updateContactById);

router.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  contacts.updateFavoriteById
);

router.delete("/:id", contacts.deleteContact);

module.exports = router;
