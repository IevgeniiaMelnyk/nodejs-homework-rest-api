const express = require("express");

const { validateBody } = require("../../utils");

const { auth } = require("../../controllers");

const {
  userSchemas: { registerSchema },
} = require("../../models");

const router = express.Router();

router.post("/register", validateBody(registerSchema), auth.registerUser);

module.exports = router;
