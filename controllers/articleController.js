const Article = require("../models/Article");

exports.getArticles = async (_req, res) => {
  try {
    const list = await Article.find().sort({ order: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const art = new Article(req.body);
    await art.save();
    res.status(201).json(art);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const art = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!art) return res.status(404).json({ message: "Article not found" });
    res.json(art);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const art = await Article.findByIdAndDelete(req.params.id);
    if (!art) return res.status(404).json({ message: "Article not found" });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
