import { Client, GatewayIntentBits } from "discord.js";
require("dotenv").config();

import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN || "");

try {
  console.log("Started refreshing application (/) commands.");

  rest
    .put(Routes.applicationCommands(process.env.APPLICATION_ID || ""), {
      body: commands,
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

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.TOKEN || "");
