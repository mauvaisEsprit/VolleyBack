require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const limiter = require("./middleware/limiter");


app.use(cors());
app.use(express.json());

// Подключаемся к MongoDB
const connectDB = require("./config/db");
connectDB();

// Роуты
app.use("/api",limiter, require("./routes/authAdmin"));
app.use("/api/events", limiter, require("./routes/EventRoutes"));
app.use("/api/news", limiter, require("./routes/NewsRoutes"));
app.use("/api/contact", limiter, require("./routes/MessageRoutes"));
app.use("/api/partners", limiter, require("./routes/partenaireRoutes"));
app.use("/api/creneaux", limiter, require("./routes/creneauRoutes"));
app.use("/api/tarifs", limiter, require("./routes/tarifsRoutes"));
app.use("/api/articles", limiter, require("./routes/articleRoutes"));
app.use("/", require("./routes/pingRoute"));


// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});