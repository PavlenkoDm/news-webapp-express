const express = require("express");
const router = express.Router();

const { validateReqBody, isValidId } = require("../../middlewares");
const { getAllNews, postNews, updateNews, getFavouriteNews, getHasReadNews } = require("../../controllers/news");
const { createNewsSchema, updateNewsSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.get("/", controllerWrapper(getAllNews));
router.post("/", validateReqBody(createNewsSchema), controllerWrapper(postNews));
router.patch("/:id", isValidId, validateReqBody(updateNewsSchema), controllerWrapper(updateNews));

router.get("/favourite", controllerWrapper(getFavouriteNews));

router.get("/read", controllerWrapper(getHasReadNews));

module.exports = router;
