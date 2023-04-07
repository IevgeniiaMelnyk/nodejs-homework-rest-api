const express = require("express");

const ctrl = require("../../controllers");

const { validateBody } = require("../../utils");

const { addSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getByIdContact);

router.post("/", validateBody(addSchema), ctrl.addNewContact);

router.put("/:id", validateBody(addSchema), ctrl.updateContactById);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
