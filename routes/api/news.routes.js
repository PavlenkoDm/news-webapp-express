const express = require("express");
const router = express.Router();

const { validateReqBody, auth } = require("../../middlewares");
const {
  getAllNews,
  postNews,
  getFavouriteNews,
  getHasReadNews,
  postFavouriteNews,
  postHasReadNews,
} = require("../../controllers/news");
const { addNewsSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.get("/", auth, controllerWrapper(getAllNews));
router.post("/", auth, validateReqBody(addNewsSchema), controllerWrapper(postNews));

router.get("/favourite", auth, controllerWrapper(getFavouriteNews));
router.post("/favourite", validateReqBody(addNewsSchema), controllerWrapper(postFavouriteNews));

router.get("/read", auth, controllerWrapper(getHasReadNews));
router.post("/read", validateReqBody(addNewsSchema), controllerWrapper(postHasReadNews));

module.exports = router;
