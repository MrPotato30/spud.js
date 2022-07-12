const { MessageActionRow, MessageSelectMenu, Message } = require("discord.js");

module.exports = class MenuPagination {
  constructor(selectMenuPaginationOptions) {
    let {
      message,
      options,
      placeholder, // *optional (default: "Nothing Selected")
      time, // *optional (default: "0")
      channel, // *optional (default: "message.channel")
      author, // *optional (default: "message.author")
      max, // *optional (default: "0")
      idle, // *optional (default: "0")
      customFilter, // *optional (default: "author")
      expiredPlaceholder, // *optional (default: "placeholder")
      customComponents, // *optional (default: "[]")
      content, // *optional (default: "none")
      interaction, // *optional (default: "false")
      homeEmbeds,
    } = selectMenuPaginationOptions;
    this.selectMenuPaginationOptions = selectMenuPaginationOptions;
    placeholder = placeholder ?? "Nothing Selected";
    content = content ?? null;
    interaction = interaction ?? false;
    let customComp = customComponents?.components ?? [];
    let customFuntion = customComponents?.event?.collect;
    let customFuntion2 = customComponents?.event?.end;
    let index = 0;
    let mappedOptions = options.map((x, i) => {
      x.embed = options[i].embed ?? options[i]?.pagination?.options?.embeds[0];
      let value = {
        label: x.label, // required
        value: index + "",
        description: x?.description ?? null,
        emoji: x.emoji,
        default: x.default,
      };
      index++;
      return value;
    });
    let selectMenu = new MessageSelectMenu()
      .setCustomId("selectMenu")
      .setPlaceholder(placeholder)
      .setOptions(...mappedOptions);

    if (!channel) channel = message.channel;
    if (!author) author = message?.author ?? message?.user;
    let filter = customFilter ? customFilter : author.id;

    const row = new MessageActionRow().addComponents(selectMenu);

    let ping =
      selectMenuPaginationOptions?.replyOptions?.mention == false
        ? false
        : true;

    async function send(sendObject) {
      let sentMsg;
      if (selectMenuPaginationOptions.replyOptions) {
        if (selectMenuPaginationOptions.replyOptions.message) {
          sentMsg = await selectMenuPaginationOptions.replyOptions.message[
            selectMenuPaginationOptions.replyOptions.type ?? "reply"
          ](sendObject);
        } else {
          sentMsg = await message[
            selectMenuPaginationOptions.replyOptions.type ?? "reply"
          ](sendObject);
        }
      } else {
        sentMsg = await channel.send(sendObject);
      }
      return sentMsg;
    }

    // options[0].embed
    //   ? options[0].embed
    //   : options[0]?.pagination.options.embeds[0];
    let currentMenuPage = 0;
    let currentPage = 0;
    let paginationComponents = (
      menuPage = currentMenuPage,
      page = currentPage
    ) => {
      return options[menuPage]?.pagination
        ? [row]
            .concat(
              options[menuPage].pagination.components(
                page,
                options[menuPage].pagination.options.embeds.length
              )
            )
            .concat(customComp)
        : [row].concat(customComp);
    };

    send({
      content,
      components: paginationComponents(),
      embeds: homeEmbeds?.flat(Infinity) ?? [options[0]?.embed],
      allowedMentions: { repliedUser: ping },
      fetchReply: interaction,
    }).then((sentMsg) => {
      if (!time) time = 0;
      if (!max) max = 0;
      if (idle && idle == true) {
        idle = time;
        time = 0;
      }

      const collector = sentMsg.createMessageComponentCollector({
        time,
        max,
        idle,
      });

      if (customFuntion) collector.on("collect", customFuntion);
      if (customFuntion2) collector.on("end", customFuntion2);

      collector.on("collect", (i) => {
        if (i.customId === "selectMenu") return;
        const id = i.customId;
        let clicker = i.user.id;
        let components =
          options[currentMenuPage]?.pagination?.components ??
          function (a, b) {
            return [];
          };
        let embeds = options[currentMenuPage].pagination.options.embeds;
        if (clicker !== filter)
          return i.reply({
            content: "This is not for you!",
            ephemeral: true,
          });
        if (id == "next") {
          currentPage++;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [row].concat(components(currentPage, embeds.length)),
          });
        }
        if (id == "previous") {
          currentPage--;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [row].concat(components(currentPage, embeds.length)),
          });
        }
        if (id == "first") {
          currentPage = 0;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [row].concat(components(currentPage, embeds.length)),
          });
        }
        if (id == "last") {
          currentPage = embeds.length - 1;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [row].concat(components(currentPage, embeds.length)),
          });
        }
      });

      collector.on("collect", (i) => {
        if (i.customId !== "selectMenu") return;
        let clicker = i.user.id;
        if (clicker !== filter)
          return i.reply({
            content: "This is not for you!",
            ephemeral: true,
          });
        currentMenuPage = i.values[0];
        currentPage = 0;
        if (options[i.values[0]]?.function) options[i.values[0]]?.function();
        return i.update({
          embeds: [options[i.values[0]].embed],
          components: paginationComponents(currentMenuPage, currentPage),
        });
      });

      collector.on("end", () => {
        let components =
          options[currentMenuPage]?.pagination?.components ??
          function (a, b) {
            return [];
          };
        sentMsg
          .edit({
            components: [
              new MessageActionRow().addComponents(
                selectMenu
                  .setPlaceholder(expiredPlaceholder ?? placeholder)
                  .setDisabled(true)
              ),
            ]
              .concat(components(0, 1))
              .concat(customComp),
          })
          .catch((e) => {});
      });
    });
  }
};
