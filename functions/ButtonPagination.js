const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class ButtonPagination {
  constructor(options) {
    (async () => {
      const defaultLabels = {};
      const defaultEmojis = {
        first: "⏪",
        previous: "◀️",
        next: "▶️",
        last: "⏩",
        pageTravel: "#️⃣",
        trash: "⛔",
      };

      const defaultStyles = {
        first: "PRIMARY",
        previous: "PRIMARY",
        next: "PRIMARY",
        last: "PRIMARY",
        pageTravel: "SUCCESS",
        trash: "DANGER",
      };
      let {
        message,
        author,
        channel,
        embeds,
        button,
        time,
        max,
        customFilter,
        fastSkip,
        resetTimerOnClick,
        pageTravel,
        trashBin,
        customComponents,
        pageFooter,
      } = options;
      let currentPage = 0;

      if (!author && message) author = message?.author ?? message.user;
      if (!channel && message) channel = message.channel;
      let customButtons = customComponents?.components ?? [];
      let customFuntion = customComponents?.event;
      pageFooter = pageFooter ?? true;

      if (button) {
        button.forEach((value) => {
          if (value.style) {
            defaultStyles[value.name] = value.style;
          }
          if (value.emoji) {
            defaultEmojis[value.name] = value.emoji;
          }
          if (value.label) {
            defaultLabels[value.name] = value.label;
          }
        });
      }

      this.options = options;

      if (pageFooter)
        embeds.forEach((embed, page) => {
          let currentFooter = embed.footer;
          if (currentFooter && currentFooter.text) {
            embed.setFooter({
              text: `${currentFooter.text} - Page ${page + 1} of ${
                embeds.length
              }`,
              iconURL: currentFooter.iconURL,
            });
          } else {
            embed.setFooter({ text: `Page ${page + 1} of ${embeds.length}` });
          }
        });

      let createButton = (id) => {
        return new MessageButton()
          .setStyle(defaultStyles[id])
          .setEmoji(defaultEmojis[id])
          .setLabel(defaultLabels[id] ?? "")
          .setCustomId(id);
      };

      // let first = createButton("first");
      // let previous = createButton("previous");
      // let next = createButton("next");
      // let last = createButton("last");
      // let travel = createButton("pageTravel");

      let buttons = [
        createButton("previous").setDisabled(false),
        createButton("next").setDisabled(false),
      ];

      let row = new MessageActionRow().addComponents(buttons);

      if (fastSkip == true) {
        buttons = [
          createButton("first").setDisabled(false),
          createButton("previous").setDisabled(false),
          createButton("next").setDisabled(false),
          createButton("last").setDisabled(false),
        ];

        row = new MessageActionRow().addComponents(buttons);
      }

      let lastPageRowButtons = [
        createButton("previous").setDisabled(false),
        createButton("next").setDisabled(true),
      ];

      let lastPageRow = new MessageActionRow().addComponents(
        lastPageRowButtons
      );

      if (fastSkip == true) {
        lastPageRowButtons = [
          createButton("first").setDisabled(false),
          createButton("previous").setDisabled(false),
          createButton("next").setDisabled(true),
          createButton("last").setDisabled(true),
        ];

        lastPageRow = new MessageActionRow().addComponents(lastPageRowButtons);
      }

      let disabledRowButton = [
        createButton("previous").setDisabled(true),
        createButton("next").setDisabled(true),
      ];

      let disabledRow = new MessageActionRow().addComponents(disabledRowButton);

      if (fastSkip == true) {
        disabledRowButton = [
          createButton("first").setDisabled(true),
          createButton("previous").setDisabled(true),
          createButton("next").setDisabled(true),
          createButton("last").setDisabled(true),
        ];

        disabledRow = new MessageActionRow().addComponents(disabledRowButton);
      }

      let firstPageRowButtons = [
        createButton("previous").setDisabled(true),
        createButton("next").setDisabled(false),
      ];

      let firstPageRow = new MessageActionRow().addComponents(
        firstPageRowButtons
      );

      if (fastSkip == true) {
        firstPageRowButtons = [
          createButton("first").setDisabled(true),
          createButton("previous").setDisabled(true),
          createButton("next").setDisabled(false),
          createButton("last").setDisabled(false),
        ];

        firstPageRow = new MessageActionRow().addComponents(
          firstPageRowButtons
        );
      }

      if (trashBin === true) {
        if (pageTravel === true) pageTravel = false;
        if (fastSkip === true) {
          buttons = [
            createButton("first").setDisabled(false),
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(false),
            createButton("last").setDisabled(false),
            createButton("trash").setDisabled(false),
          ];

          row = new MessageActionRow().addComponents(buttons);

          lastPageRowButtons = [
            createButton("first").setDisabled(false),
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(true),
            createButton("last").setDisabled(true),
            createButton("trash").setDisabled(false),
          ];

          lastPageRow = new MessageActionRow().addComponents(
            lastPageRowButtons
          );

          firstPageRowButtons = [
            createButton("first").setDisabled(true),
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(false),
            createButton("last").setDisabled(false),
            createButton("trash").setDisabled(false),
          ];

          firstPageRow = new MessageActionRow().addComponents(
            firstPageRowButtons
          );

          disabledRowButton = [
            createButton("first").setDisabled(true),
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(true),
            createButton("last").setDisabled(true),
            createButton("trash").setDisabled(true),
          ];

          disabledRow = new MessageActionRow().addComponents(disabledRowButton);
        } else {
          buttons = [
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(false),
            createButton("trash").setDisabled(false),
          ];

          row = new MessageActionRow().addComponents(buttons);

          lastPageRowButtons = [
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(true),
            createButton("trash").setDisabled(false),
          ];

          lastPageRow = new MessageActionRow().addComponents(
            lastPageRowButtons
          );

          firstPageRowButtons = [
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(false),
            createButton("trash").setDisabled(false),
          ];

          firstPageRow = new MessageActionRow().addComponents(
            firstPageRowButtons
          );

          disabledRowButton = [
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(true),
            createButton("trash").setDisabled(true),
          ];

          disabledRow = new MessageActionRow().addComponents(disabledRowButton);
        }
      }

      if (pageTravel == true) {
        if (fastSkip == true) {
          buttons = [
            createButton("first").setDisabled(false),
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(false),
            createButton("last").setDisabled(false),
            createButton("pageTravel").setDisabled(false),
          ];

          row = new MessageActionRow().addComponents(buttons);

          lastPageRowButtons = [
            createButton("first").setDisabled(false),
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(true),
            createButton("last").setDisabled(true),
            createButton("pageTravel").setDisabled(false),
          ];

          lastPageRow = new MessageActionRow().addComponents(
            lastPageRowButtons
          );

          firstPageRowButtons = [
            createButton("first").setDisabled(true),
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(false),
            createButton("last").setDisabled(false),
            createButton("pageTravel").setDisabled(false),
          ];

          firstPageRow = new MessageActionRow().addComponents(
            firstPageRowButtons
          );

          disabledRowButton = [
            createButton("first").setDisabled(true),
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(true),
            createButton("last").setDisabled(true),
            createButton("pageTravel").setDisabled(true),
          ];

          disabledRow = new MessageActionRow().addComponents(disabledRowButton);
        } else {
          buttons = [
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(false),
            createButton("pageTravel").setDisabled(false),
          ];

          row = new MessageActionRow().addComponents(buttons);

          lastPageRowButtons = [
            createButton("previous").setDisabled(false),
            createButton("next").setDisabled(true),
            createButton("pageTravel").setDisabled(false),
          ];

          lastPageRow = new MessageActionRow().addComponents(
            lastPageRowButtons
          );

          firstPageRowButtons = [
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(false),
            createButton("pageTravel").setDisabled(false),
          ];

          firstPageRow = new MessageActionRow().addComponents(
            firstPageRowButtons
          );

          disabledRowButton = [
            createButton("previous").setDisabled(true),
            createButton("next").setDisabled(true),
            createButton("pageTravel").setDisabled(true),
          ];

          disabledRow = new MessageActionRow().addComponents(disabledRowButton);
        }
      }

      let components = (page = currentPage, maxPage = embeds.length) => {
        let arr1 = [
          page == 0 && maxPage == 1
            ? disabledRow
            : page == 0
            ? firstPageRow
            : page !== maxPage - 1
            ? row
            : lastPageRow,
        ].concat(customButtons);
        return arr1;
      };

      this.components = components;

      let sentMsg;

      let ping = options?.replyOptions?.mention == false ? false : true;

      let sendObject = {
        embeds: [embeds[0]],
        components:
          embeds.length !== 1
            ? [firstPageRow].concat(customButtons)
            : [disabledRow].concat(customButtons),
        allowedMentions: { repliedUser: ping },
        content: options.content,
        fetchReply: options.replyOptions?.interaction ?? false,
      };

      if (options.dontSend === true) return;
      else {
        if (options.replyOptions) {
          if (options.replyOptions.message) {
            sentMsg = await options.replyOptions.message[
              options.replyOptions.type ?? "reply"
            ](sendObject);
          } else {
            sentMsg = await message[options.replyOptions.type ?? "reply"](
              sendObject
            );
          }
        } else {
          sentMsg = await channel.send(sendObject);
        }
      }

      let filter = customFilter ? customFilter : author.id;

      if (!time) time = 0;
      if (!max) max = 0;
      let idle = 0;
      if (resetTimerOnClick && resetTimerOnClick == true) {
        idle = time;
        time = 0;
      }

      const collector = sentMsg.createMessageComponentCollector({
        time,
        max,
        idle,
      });

      if (customFuntion) collector.on("collect", customFuntion);

      collector.on("collect", (i) => {
        const id = i.customId;
        let clicker = i.user.id;
        if (clicker !== filter)
          return i.reply({
            content: "This is not for you!",
            ephemeral: true,
          });
        if (id == "next") {
          currentPage++;
          return i.update({
            embeds: [embeds[currentPage]],
            components: components(),
          });
        }
        if (id == "previous") {
          currentPage--;
          return i.update({
            embeds: [embeds[currentPage]],
            components: components(),
          });
        }
        if (id == "first") {
          currentPage = 0;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [firstPageRow],
          });
        }
        if (id == "last") {
          currentPage = embeds.length - 1;
          return i.update({
            embeds: [embeds[currentPage]],
            components: [lastPageRow],
          });
        }

        if (id == "trash") {
          collector.stop();
          sentMsg.delete().catch(() => {});
        }

        if (id == "pageTravel") {
          const numberTravel = async () => {
            const collector = channel.createMessageCollector({
              filter: (msg) => msg.author.id === i.user.id,
              time: 30000,
            });
            await i.reply({
              content: `Type the page you want to travel! You have **30s**. type \`cancel\` or \`stop\` to end`,
              ephemeral: true,
            });

            sentMsg.edit({ components: [disabledRow] });

            collector.on("collect", (message) => {
              if (
                message.content.toLowerCase() === "cancel" ||
                message.content.toLowerCase() === "stop"
              ) {
                message.delete().catch(() => {});
                return collector.stop();
              }
              const int = parseInt(message.content);
              if (isNaN(int) || !(int - 1 < embeds.length) || !(int >= 1))
                return;
              currentPage = int - 1;
              message.delete().catch(() => {});
              sentMsg.edit({
                embeds: [embeds[currentPage]],
                components: [disabledRow],
              });
            });

            collector.on("end", () => {
              sentMsg.edit({ components: components() });
            });
          };
          return numberTravel();
        }
      });

      collector.on("end", async (i) => {
        sentMsg.edit({ components: [disabledRow] }).catch(() => {});
      });
    })();
  }
};
