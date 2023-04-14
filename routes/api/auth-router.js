const express = require("express");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { auth } = require("../../controllers");

const {
  userSchemas: { registerSchema, loginSchema, updateSubscriptionSchema },
} = require("../../models");

const router = express.Router();

router.post("/register", validateBody(registerSchema), auth.registerUser);

router.post("/login", validateBody(loginSchema), auth.loginUser);

router.get("/current", authenticate, auth.getCurrentUser);

router.post("/logout", authenticate, auth.logoutUser);

router.patch(
  "/:email",
  authenticate,
  validateBody(updateSubscriptionSchema),
  auth.updateSubscription
);

module.exports = router;
