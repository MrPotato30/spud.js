if(Number(+process.version.slice(1, 3)) < 16) throw new SpudJSError("NodeJS v16+ required");

try {
  require('discord.js');
} catch (e) {
	throw new SpudJSError("Discord.JS is required");
}

const { version: discordJSVersion } = require(require('path').join(
	require.resolve('discord.js'),
	'..',
	'..',
	'package.json'
));

if (Number(discordJSVersion.slice(0, 2)) < 13)
	throw new SpudJSError('DiscordJS v13+ required');

module.exports = {
  ButtonPagination: require("./functions/ButtonPagination"),
  ButtonPaginationBuilder: require("./functions/ButtonPaginationBuilder"),
  MenuPagination: require("./functions/MenuPagination"),
  MenuPaginationBuilder: require("./functions/MenuPaginationBuilder"),
  API: {
    welcomer: require("./functions/welcomer"),
  },
  spudError: require(`./functions/SpudError.js`)
};
