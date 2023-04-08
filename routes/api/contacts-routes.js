const express = require("express");

const ctrl = require("../../controllers");

const { validateBody } = require("../../utils");

const {
  schemas: { addSchema, updateFavoriteSchema },
} = require("../../models");

const router = express.Router();

router.get("/", ctrl.getListContacts);

router.get("/phone", ctrl.getAllPhones);

router.get("/:id", ctrl.getByIdContact);

router.post("/", validateBody(addSchema), ctrl.addNewContact);

router.put("/:id", validateBody(addSchema), ctrl.updateContactById);

router.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
