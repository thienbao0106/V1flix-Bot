import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { listCommands } from "./commands/commands";
const fs = require("fs");
require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN || "");
try {
  console.log("Started refreshing application (/) commands.");

  rest
    .put(Routes.applicationCommands(process.env.APPLICATION_ID || ""), {
      body: listCommands,
    })
    .then(() => {
      console.log("Successfully reloaded application (/) commands.");
    });
} catch (error) {
  console.error(error);
}

const client: any = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;

  fs.readdir("./events/", (err: any, files: any) => {
    if (err) return console.error(err);
    files.forEach(async (file: any) => {
      let eventName = file.split(".")[0];
      if (interaction.commandName === eventName) {
        const event = require(`./events/${file}`);
        await event(client, interaction);
        return;
      }
    });
  });
});

client.login(process.env.TOKEN || "");
