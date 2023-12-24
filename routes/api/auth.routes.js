const express = require("express");
const passport = require("passport");
const router = express.Router();

const { validateReqBody, auth, authRefresh } = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");
const {
  signInSchema,
  signUpSchema,
  refreshUserSchema,
  updateUserEmailShema,
  updateUserPasswordShema,
  updateThemeSchema,
  forgotPasswordReqSchema,
  forgotPasswordChangeSchema,
} = require("../../schemas");

const {
  signUpUser,
  signInUser,
  signOutUser,
  refreshUser,
  getCurrentUser,
  googleRedirect,
  updateUserEmail,
  updateUserPassword,
  updateUserTheme,
  forgotPasswordReq,
  forgotPasswordChange,
} = require("../../controllers/auth");

const { googleStrategy } = require("../../configs");

passport.use(googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.post("/sign-up", validateReqBody(signUpSchema), controllerWrapper(signUpUser));
router.post("/sign-in", validateReqBody(signInSchema), controllerWrapper(signInUser));
router.post("/sign-out", auth, controllerWrapper(signOutUser));

router.get("/current-user", auth, controllerWrapper(getCurrentUser));

router.post(
  "/refresh",
  authRefresh,
  validateReqBody(refreshUserSchema),
  controllerWrapper(refreshUser)
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google-redirect",
  passport.authenticate("google", { failureRedirect: "https://news-portal-refactor.vercel.app" }),
  controllerWrapper(googleRedirect)
);

router.patch(
  "/update-email",
  auth,
  validateReqBody(updateUserEmailShema),
  controllerWrapper(updateUserEmail)
);

router.patch(
  "/update-password",
  auth,
  validateReqBody(updateUserPasswordShema),
  controllerWrapper(updateUserPassword)
);

router.patch(
  "/update-theme",
  auth,
  validateReqBody(updateThemeSchema),
  controllerWrapper(updateUserTheme)
);

router.post(
  "/forgot-password-request",
  validateReqBody(forgotPasswordReqSchema),
  controllerWrapper(forgotPasswordReq)
);

router.post(
  "/forgot-password-change",
  auth,
  validateReqBody(forgotPasswordChangeSchema),
  controllerWrapper(forgotPasswordChange)
);

module.exports = router;
