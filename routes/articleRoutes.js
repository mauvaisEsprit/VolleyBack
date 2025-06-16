const express = require("express");
const authAdmin = require("../middleware/isAdmin");
const articleController = require("../controllers/articleController");

const router = express.Router();

router.get("/", articleController.getArticles);
router.post("/", authAdmin, articleController.createArticle);
router.put("/:id", authAdmin, articleController.updateArticle);
router.delete("/:id", authAdmin, articleController.deleteArticle);

module.exports = router;
