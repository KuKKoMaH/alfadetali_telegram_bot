const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const api = require('./app/api');
const links = require('./app/links');
const generatePartName = require('./app/generatePartName');

api.login().then((token) => {
  const bot = new TelegramBot(config.botToken, { polling: true });
  bot.on('message', function(msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    api.search(text, token).then(res => {
      if (!res.total) {
        bot.sendMessage(chatId, 'Ничего не найдено');
        return;
      }
      const items = res.parts;
      const itemLinks = items.map(generatePartName);
      const message = `Результаты поиска (*всего ${res.total}*):\n${itemLinks.join('\n')}\n\n[Все результаты](${links.search(text)})`;
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    });
  });
});
