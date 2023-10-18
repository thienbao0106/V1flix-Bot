import { ApplicationCommandOptionType } from "discord.js";

type Commands = {
  name: String;
  description: String;
  options?: any[];
};

export const listCommands: Commands[] = [
  {
    name: "ping",
    description: "Show your internet connection",
  },
  {
    name: "search",
    description: "Search a show by title",
    options: [
      {
        name: "keyword",
        description: "Input your title",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "random",
    description: "Give you a random show",
  },
  {
    name: "episode",
    description: "Help you check the episode",
    options: [
      {
        name: "id",
        description: "Input series id",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "ep",
        description: "Input your episode number",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
];
