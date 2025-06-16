const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

const TarifPackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  items: [ItemSchema],
});

module.exports = mongoose.model("TarifPack", TarifPackSchema, "tarifpacks");
