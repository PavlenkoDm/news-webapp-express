const express = require("express");
const passport = require("passport");
const router = express.Router();

const { validateReqBody, auth, authRefresh, authPasswordChange } = require("../../middlewares");
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
  socialsBind,
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
  socialsAccBind,
  socialsAccUnbind,
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
  authPasswordChange,
  validateReqBody(forgotPasswordChangeSchema),
  controllerWrapper(forgotPasswordChange),
  controllerWrapper(signInUser)
);

router.patch(
  "/:socials/bind",
  auth,
  validateReqBody(socialsBind),
  controllerWrapper(socialsAccBind)
);

router.patch("/:socials/unbind", auth, controllerWrapper(socialsAccUnbind));

module.exports = router;
