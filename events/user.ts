import { USER_EMBEDED } from "./../constants/userEmbed";
import axios from "axios";
import { errorEmbed } from "../utils/error";
import {
  ActionRowBuilder,
  ComponentType,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

module.exports = async (client: any, interaction: any) => {
  const keyword = interaction.options.get("name").value;
  console.log(keyword);
  const { user } = interaction.member;
  const result: any = await axios.post(process.env.SERVER_API || "", {
    operationName: "findUsers",
    query: `query findUsers {
        findUsers(username: "${keyword}") {
          _id
          email
          avatar
          username
          favoriteList {
            title {
              main_title
            }
          }
          stats {
            total_episodes
            days_watched
          }
        }
      }
    `,
    variables: {},
  });
  const { findUsers: users } = result.data.data;

  if (users.length === 0) {
    await interaction.reply({
      embeds: [
        errorEmbed(
          user,
          `Can't find the result with keyword: ${keyword}`,
          `Search user`
        ),
      ],
    });
    return;
  }

  const searchEmbed = new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
    })
    .setTitle(`Search results for ${keyword}`)
    .setDescription(
      `Found ${users.length}. Please pick one option in dropdown below.`
    )
    .addFields(
      users.map((user: any) => {
        return {
          name: user.username,
          value: user.email,
        };
      })
    );

  const select = new StringSelectMenuBuilder()
    .setCustomId("v1flix")
    .setPlaceholder("Pick a user")
    .addOptions(
      users.map((user: any) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(user.username)
          .setValue(user._id)
      )
    );
  const row = new ActionRowBuilder().addComponents(select);
  const response = await interaction.reply({
    embeds: [searchEmbed],
    components: [row],
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
  });

  collector.on("collect", async (i: any) => {
    const idSelected = i.values[0];
    const foundUser = users.find((series: any) => series._id === idSelected);
    const userEmbeded = USER_EMBEDED(user, foundUser);
    await i.reply({
      embeds: [userEmbeded],
    });
  });
};
