const { Client, Intents, Collection } = require(`discord.js`);
const IntentsList = require(`../constants/IntentsList.js`);
const config = require(`../config.json`);
require(`dotenv`).config();
class spudjsClient extends Client {
  constructor() {
    super({ intents: IntentsList });

    this.config = config;
  }

  start() {
    this.login(process.env.BOT_TOKEN);
  }
}

module.exports = spudjsClient;
