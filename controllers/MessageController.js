const Message = require("../models/Message");
const { sendReplyToClientEmail } = require("../utils/messageContact");
const { sendReplyMessageToClientEmail } = require("../utils/messageReponse");
const asyncHandler = require("../middleware/asyncHandler");

// Получить все сообщения
exports.getAllMessages = asyncHandler (async (req, res) => {
  try {
    console.log('Запрос на получение всех сообщений');
  const messages = await Message.find().sort({ createdAt: -1 });
  console.log(`Найдено сообщений: ${messages.length}`);
  res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера при получении сообщений" });
  }
});

// Получить сообщение по id
exports.getMessageById = asyncHandler (async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).json({ message: "Сообщение не найдено" });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера при получении сообщения" });
  }
});

exports.createMessage = asyncHandler (async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Поля name, email и message обязательны" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // сначала отвечаем клиенту
    res.status(201).json(newMessage);

    // письмо отправляем асинхронно, чтобы его сбой не ломал API‑ответ
    sendReplyToClientEmail({ name, email, message }).catch((err) =>
      console.error("Mail error:", err)
    );
  } catch (error) {
    console.error("Create message error:", error);
    res.status(500).json({ message: "Ошибка сервера при создании сообщения" });
  }
});

exports.replyMessage = asyncHandler (async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || replyText.trim() === "") {
      return res.status(400).json({ error: "Текст ответа обязателен" });
    }

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Сообщение не найдено" });
    }

    // Отправка email с ответом
    await sendReplyMessageToClientEmail({
      email: message.email,
      name: message.name,
      originalMessage: message.message,
      replyText,
    });

    message.replied = true;
    message.replyDate = new Date();
    message.replyText = replyText;
    await message.save();

    res.json({ success: true, message: "Ответ успешно отправлен" });
  } catch (err) {
    console.error("Ошибка при ответе на сообщение:", err);
    res.status(500).json({ error: "Ошибка при отправке ответа" });
  }
});

// Удалить сообщение по id (только для админа)
exports.deleteMessage = asyncHandler (async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).json({ message: "Сообщение не найдено" });

    await message.deleteOne();
    res.json({ message: "Сообщение успешно удалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера при удалении сообщения" });
  }
});
