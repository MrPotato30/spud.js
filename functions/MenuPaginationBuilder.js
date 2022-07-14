let MenuPagination = require("./MenuPagination");

class MenuPaginationBuilder {
  constructor(message) {
    this.embeds = [];
    if (!message) throw new SpudJSError("message wasn't specified!");
    this.message = message;
  }
  setPlaceholder(
    activePlaceholder = "Nothing Selected",
    expiredPlaceholder = "This interaction is expired"
  ) {
    this.placeholder = activePlaceholder;
    this.expiredPlaceholder = expiredPlaceholder;
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
  setContent(content = "") {
    this.content = content;
    return this;
  }
  replyOption(options, enabled = true) {
    if (enabled === true) {
      this.replyOptions = options;
    } else {
      delete this.replyOptions;
    }
    return this;
  }
  setIdle(boolean = false) {
    this.resetTimerOnClick = boolean;
    return this;
  }
  setFilter(User) {
    this.customFilter = User?.id;
    return this;
  }
  setComponents(components, collect, end) {
    this.customComponents = {
      components,
      event: { collect, end },
    };
    return this;
  }
  setInteraction(Boolean = false) {
    this.interaction = Boolean;
    return this;
  }
  setOptions(...data) {
    this.options = data.flat(Infinity);
    return this;
  }
  addOptions(...data) {
    this.options.push(...data.flat(Infinity));
    return this;
  }
  setHome(...embeds) {
    this.homeEmbeds = [...embeds];
    return this;
  }
}

MenuPaginationBuilder.prototype.send = function () {
  new MenuPagination(this);
};

module.exports = MenuPaginationBuilder;
