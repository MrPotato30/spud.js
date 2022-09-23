let MessagePagination = require("./ButtonPagination");
// let Discord = require('discord.js')
// let { User, Channel } = Discord;

class SpudJSError extends Error {
  constructor(message, name = "Error") {
    super(message);
    this.name = name;
  }
}

class ButtonPaginationBuilder {
  constructor(message) {
    this.embeds = [];
    if (!message) throw new SpudJSError("message wasn't specified!");
    this.message = message;
  }
  setEmbeds(...embeds) {
    this.embeds = embeds.flat(Infinity);
    return this;
  }
  addEmbeds(...embeds) {
    this.embeds.push(...embeds.flat(Infinity));
    return this;
  }
  fastSkip(fastSkipEnabled = false) {
    this.fastSkip = fastSkipEnabled;
    return this;
  }
  setTime(ms = 0) {
    this.time = ms;
    return this;
  }
  setMax(max = 0) {
    this.max = max;
    return this;
  }
  setAuthor(user) {
    this.author = user;
    return this;
  }
  setChannel(channel) {
    this.channel = channel;
    return this;
  }
  setContent(content) {
    this.content = content;
    return this;
  }
  replyOption(options, enabled = false) {
    if (enabled === true) {
      this.replyOptions = options;
    } else {
      delete this.replyOptions;
    }
    return this;
  }
  setIdle(boolean) {
    this.resetTimerOnClick = boolean;
    return this;
  }
  pageTravel(boolean) {
    this.pageTravel = boolean;
    return this;
  }
  setButtons(name, properties = {}) {
    this.button = this.button ?? [];
    const index = this.button.findIndex((e) => e.name === name);
    if (!["first", "previous", "next", "last", "pageTravel"].includes(name)) {
      throw new SpudJSError(`Invalid button name (reading '${name}')`);
    }
    if (index === -1) {
      properties.name = name;
      this.button.push(properties);
    } else {
      this.button[index] = properties;
    }
    return this;
  }
  setCustomButton(properties = []) {
    this.button = properties;
    return this;
  }
  setFilter(User) {
    this.customFilter = User?.id;
    return this;
  }
  trash(Boolean) {
    this.trashBin = Boolean;
    return this;
  }
  setComponents(components, event) {
    this.customComponents = {
      components,
      event,
    };
    return this;
  }
  pageFooter(Boolean) {
    this.pageFooter = Boolean;
    return this;
  }
}

ButtonPaginationBuilder.prototype.send = function (send = true) {
  this.dontSend = !send;
  let pagination = new MessagePagination(this);
  return pagination;
};

module.exports = ButtonPaginationBuilder;
