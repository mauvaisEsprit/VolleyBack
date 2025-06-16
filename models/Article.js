const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String, // Например: "30 €", "35 € / 40 €", "20 €"
      required: true,
    },
    description: {
      type: String,
      default: "", // Необязательное поле
    },
    order: {
      type: Number,
      default: 0, // Для сортировки в нужном порядке
    },
    image: {
      type: String, // URL картинки
      default: "",  // Можно оставить пустым, если нет фото
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema, "articles");
