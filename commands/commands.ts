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
];
