import { getImage } from "./../utils/image";
import axios from "axios";
import {
  ActionRowBuilder,
  Colors,
  ComponentType,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

const createEmbed = (user: any, series: any, image: any) => {
  return new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
    })
    .setColor(Colors.Blue)
    .setDescription(series.description)
    .setThumbnail(image.source)
    .setTitle(series.title)
    .setURL(
      `https://v2flix.netlify.app/series/${series.title.replaceAll(
        " ",
        "%20"
      )}?ep=1`
    )
    .addFields(
      { name: "Type", value: `${series.type}`, inline: true },
      { name: "Episodes", value: `${series.total_episodes}`, inline: true },
      { name: "Status", value: `${series.status}`, inline: true }
    );
};

module.exports = async (client: any, interaction: any) => {
  const keyword = interaction.options.get("keyword").value;
  const { user } = interaction.member;

  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "findSeriesByName",
    query: `query findSeriesByName {
        findSeries(title: "${keyword}", numOfLimit: 0) {
          _id
          title
          description
          type
          total_episodes
          status
          season
          images {
            type
            source
          }
        }
      }
    `,
    variables: {},
  });
  const { findSeries } = result.data.data;
  if (findSeries.length === 0)
    await interaction.reply(`Can't find the result with keyword: ${keyword}`);

  const searchEmbed = new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
    })
    .setTitle(`Search results for ${keyword}`)
    .setDescription(
      `Found ${findSeries.length}. Please pick one option in dropdown below.`
    )
    .addFields(
      findSeries.map((series: any) => {
        return {
          name: series.title,
          value: series.season,
        };
      })
    );
  const select = new StringSelectMenuBuilder()
    .setCustomId("v1flix")
    .setPlaceholder("Pick an series")
    .addOptions(
      findSeries.map((series: any) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(series.title)
          .setValue(series._id)
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
    const series = findSeries.find((series: any) => series._id === idSelected);
    const image = getImage(series.images, "cover");
    const seriesEmbed = createEmbed(user, series, image);
    await i.reply({
      embeds: [seriesEmbed],
    });
  });
};
