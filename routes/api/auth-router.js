const express = require("express");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const { auth } = require("../../controllers");

const {
  userSchemas: {
    registerSchema,
    loginSchema,
    emailSchema,
    updateSubscriptionSchema,
  },
} = require("../../models");

const router = express.Router();

router.post("/register", validateBody(registerSchema), auth.registerUser);

router.get("/verify/:verificationToken", auth.verifyUser);

router.post(
  "/resend-verify-email",
  validateBody(emailSchema),
  auth.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), auth.loginUser);

router.get("/current", authenticate, auth.getCurrentUser);

router.post("/logout", authenticate, auth.logoutUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  auth.updateAvatar
);

router.patch(
  "/:email",
  authenticate,
  validateBody(updateSubscriptionSchema),
  auth.updateSubscription
);

module.exports = router;
