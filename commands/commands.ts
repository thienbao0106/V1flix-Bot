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
  {
    name: "new",
    description: "Update the new information",
    options: [
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "series",
        description: "Update the new uploaded series",
        options: [
          {
            name: "id",
            type: ApplicationCommandOptionType.String,
            description: "Id of the updated series",
          },
        ],
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "episode",
        description: "Update the new uploaded episode",
        options: [
          {
            name: "id",
            type: ApplicationCommandOptionType.String,
            description: "Id of the updated series",
          },
        ],
      },
    ],
  },
  {
    name: "source",
    description: "Help you check the website's episode sources",
    options: [
      {
        name: "video",
        type: ApplicationCommandOptionType.Subcommand,
        description: "Check video source of an episode",
        options: [
          {
            name: "id",
            type: ApplicationCommandOptionType.String,
            description: "Id of the episode",
          },
        ],
      },
      {
        name: "subtitles",
        type: ApplicationCommandOptionType.Subcommand,
        description: "Check subtitles source of an episode",
        options: [
          {
            name: "id",
            type: ApplicationCommandOptionType.String,
            description: "Id of the episode",
          },
          {
            name: "lang",
            type: ApplicationCommandOptionType.String,
            description: "Languages of the episode's subtitles",
          },
        ],
      },
    ],
  },
];
