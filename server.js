require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const limiter = require("./middleware/limiter");
const connectDB = require("./config/db");

const app = express();

// Защита
app.disable("x-powered-by"); // скрыть информацию о технологии
app.use(helmet()); // безопасные заголовки
app.use(express.json({ limit: "10kb" })); // ограничение размера JSON
app.use(express.urlencoded({ extended: true }));
console.log('mongoSanitize middleware подключен с sanitizeQuery=false');
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});
console.log('mongoSanitize middleware подключен с sanitizeQuery=false');

 // защита от NoSQL-инъекций
app.use(xss()); // защита от XSS
app.use(hpp()); // защита от дублирующихся параметров

// CORS: разрешён только твой фронтенд
const allowedOrigins = ["https://volley-arbent.vercel.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow access from this origin"));
    }
  },
  credentials: true,
}));

// Логирование запросов
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Подключение к БД
connectDB();

// Роуты
app.use("/api", limiter, require("./routes/authAdmin"));
app.use("/api/events", limiter, require("./routes/EventRoutes"));
app.use("/api/news", limiter, require("./routes/NewsRoutes"));
app.use("/api/contact", limiter, require("./routes/MessageRoutes"));
app.use("/api/partners", limiter, require("./routes/partenaireRoutes"));
app.use("/api/creneaux", limiter, require("./routes/creneauRoutes"));
app.use("/api/tarifs", limiter, require("./routes/tarifsRoutes"));
app.use("/api/articles", limiter, require("./routes/articleRoutes"));
app.use("/", require("./routes/pingRoute"));

// Глобальный обработчик ошибок (если что-то упало)
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message.includes("CORS")) {
    return res.status(403).json({ message: "Access denied by CORS policy" });
  }
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});


// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
