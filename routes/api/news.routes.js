const express = require("express");
const router = express.Router();

const { validateReqBody } = require("../../middlewares");
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

router.get("/", controllerWrapper(getAllNews));
router.post("/", validateReqBody(addNewsSchema), controllerWrapper(postNews));
// router.patch("/:id", isValidId, validateReqBody(updateNewsSchema), controllerWrapper(updateNews));

router.get("/favourite", controllerWrapper(getFavouriteNews));
router.post("/favourite", validateReqBody(addNewsSchema), controllerWrapper(postFavouriteNews));

router.get("/read", controllerWrapper(getHasReadNews));
router.post("/read", validateReqBody(addNewsSchema), controllerWrapper(postHasReadNews));

module.exports = router;
