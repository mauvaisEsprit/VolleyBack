const Message = require('../models/Message');

// Получить все сообщения
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при получении сообщений' });
  }
};

// Получить сообщение по id
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Сообщение не найдено' });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при получении сообщения' });
  }
};

// Создать новое сообщение
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Поля name, email и message обязательны' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при создании сообщения' });
  }
};

// Удалить сообщение по id (только для админа)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Сообщение не найдено' });

    await message.deleteOne();
    res.json({ message: 'Сообщение успешно удалено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при удалении сообщения' });
  }
};
