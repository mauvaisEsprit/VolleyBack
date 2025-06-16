require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("./middleware/rateLimitMiddle");


app.use(cors());
app.use(express.json());

// Подключаемся к MongoDB
const connectDB = require("./config/db");
connectDB();

// Роуты
app.use("/api", require("./routes/authAdmin"));
app.use("/api/events", require("./routes/EventRoutes"));
app.use("/api/news", require("./routes/NewsRoutes"));
app.use("/api/contact", rateLimit,  require("./routes/MessageRoutes"));
app.use("/api/partners", require("./routes/partenaireRoutes"));
app.use("/api/creneaux", require("./routes/creneauRoutes"));
app.use("/api/tarifs", require("./routes/tarifsRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/", require("./routes/pingRoute"));


// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});