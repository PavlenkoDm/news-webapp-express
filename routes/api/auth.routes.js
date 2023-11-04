const express = require("express");
const router = express.Router();

const { validateReqBody, auth } = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");
const { signInSchema, signUpSchema } = require("../../schemas");
const { signUpUser, signInUser, signOutUser } = require("../../controllers/auth");

router.post("/sign-up", validateReqBody(signUpSchema), controllerWrapper(signUpUser));

router.post("/sign-in", validateReqBody(signInSchema), controllerWrapper(signInUser));

router.post("/sign-out", auth, controllerWrapper(signOutUser));

module.exports = router;
