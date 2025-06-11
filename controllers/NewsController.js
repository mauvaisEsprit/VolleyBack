const News = require('../models/News');
const slugify = require('slugify');

// Получить все новости
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ date: -1 });
    res.status(200).json(newsList);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des actualités.' });
  }
};

// Получить одну новость по slug
exports.getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) {
      return res.status(404).json({ error: 'Actualité non trouvée.' });
    }
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'actualité.' });
  }
};

// Создать новую новость
exports.createNews = async (req, res) => {
  try {
    // Генерируем slug автоматически из title
    req.body.slug = slugify(req.body.title, {
      lower: true,
      strict: true,   // Убирает все символы кроме букв, цифр и дефисов
      remove: /[*+~.()'"!:@]/g  // Дополнительное удаление спецсимволов по необходимости
});

    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'actualité.', details: err.message });
  }
};

// Обновить новость по slug
exports.updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: 'Actualité non trouvée pour mise à jour.' });
    }

    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'actualité.', details: err.message });
  }
};

// Удалить новость по slug
exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findOneAndDelete({ slug: req.params.slug });

    if (!deletedNews) {
      return res.status(404).json({ error: 'Actualité non trouvée pour suppression.' });
    }

    res.status(200).json({ message: 'Actualité supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'actualité.' });
  }
};
