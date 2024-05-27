const express = require("express");
const router = express.Router();

const {
  validateReqBody,
  auth,
  toArchiveOldNews,
  sanifyNewsCollection,
} = require("../../middlewares");
const {
  getAllNews,
  postNews,
  getFavouriteNews,
  getHasReadNews,
  // postFavouriteNews,
  // postHasReadNews,
  getArchiveNews,
  removeArchiveNews,
  getHistoryLog,
  removeHistoryLog,
} = require("../../controllers/news");

const { addNewsSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.get("/", auth, sanifyNewsCollection, toArchiveOldNews, controllerWrapper(getAllNews));
router.post("/", auth, validateReqBody(addNewsSchema), controllerWrapper(postNews));

router.get(
  "/favourite",
  auth,
  sanifyNewsCollection,
  toArchiveOldNews,
  controllerWrapper(getFavouriteNews)
);

router.get(
  "/read",
  auth,
  sanifyNewsCollection,
  toArchiveOldNews,
  controllerWrapper(getHasReadNews)
);

router.get("/archive", auth, controllerWrapper(getArchiveNews));
router.delete("/archive/:id", auth, controllerWrapper(removeArchiveNews));

router.get("/history-log", auth, controllerWrapper(getHistoryLog));
router.delete("/delete-log", auth, controllerWrapper(removeHistoryLog));

module.exports = router;
