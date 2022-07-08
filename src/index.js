module.exports = {
  ButtonPagination: require("./functions/ButtonPagination"),
  ButtonPaginationBuilder: require("./functions/ButtonPaginationBuilder"),
  MenuPagination: require("./functions/MenuPagination"),
  MenuPaginationBuilder: require("./functions/MenuPaginationBuilder"),
  API: {
    welcomer: require("./functions/welcomer"),
  },
};
let spudjsClient = require(`./classes/client.js`);
const client = (global.client = new spudjsClient());
client.start();