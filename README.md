# Spud.JS

![Spud.JS logo](https://camo.githubusercontent.com/785f7be94344e6a7f00d24995bc59f69220590a69d40f60270c63477f6748cd6/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3932353634383131393439393230323536302f3932373034333938323437373839373738382f6f75747075742d6f6e6c696e65706e67746f6f6c732e706e67)

### Links: [Documents](https://github.com/MrPotato30/spudjs-docs) | [Support Server](https://discord.gg/VX4bVtCahg)
###### You don't wanna miss out on our future updates!

## Guide

### Installation:
```
npm i spud.js@latest
```

#### Now, let's create a pagination. There's currently **2** types of paginations available.
- Button Pagination `use discord buttons to navigate throughout the pagination`
- Menu Pagination `use discord select menus to navigate throughout the pagination`

## Codes Examples:
### Basic Button Pagination
```js
const { ButtonPaginationBuilder } = require('spud.js');

client.on('messageCreate', (message) => {
// define the pages
  const page1 = new MessageEmbed().setDescription('This is page 1')
  const page2 = new MessageEmbed().setDescription('This is page 2')

  if (message.content === 'pagination') {
  // building the pagination
    const pagination = new ButtonPaginationBuilder(message)
      .setEmbeds(page1, page2) // adding the pages
      
    pagination.send() // send the pagination
  }
})
``` 

###### Visit the documents about [ButtonPaginationBuilder](https://github.com/MrPotato30/spudjs-docs/tree/main/docs/packages/ButtonPaginationBuilder)

### Basic Menu Pagination
```js
const { MenuPaginationBuilder } = require("spud.js");

client.on("messageCreate", (message) => {
  // define the pages
  const page1 = new MessageEmbed().setDescription("This is page 1");
  const page2 = new MessageEmbed().setDescription("This is page 2");

  if (message.content === "pagination") {
    // building the pagination
    const pagination = new MenuPaginationBuilder(message).setOptions([
      {
        embed: page1,
        label: "page 1",
      },
      {
        embed: page2,
        label: "page 2",
      },
    ]);
    pagination.send(); // send the pagination
  }
});

``` 

###### Visit the documents about [MenuPaginationBuilder](https://github.com/MrPotato30/spudjs-docs/tree/main/docs/packages/ButtonPaginationBuilder)