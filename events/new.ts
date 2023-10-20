import { Colors, EmbedBuilder } from "discord.js";
import { getImage } from "../utils/image";
import axios from "axios";
import { MAIN_URL } from "../constants/url";

const seriesEmbed = (series: any) => {
  const image: any = getImage(series.images, "cover");

  return new EmbedBuilder()
    .setImage(image.source)
    .setColor(Colors.Green)
    .setTitle(series.title)
    .setTimestamp()
    .addFields({
      name: "URL",
      value: MAIN_URL(series.title, 1),
      inline: false,
    });
};

module.exports = async (client: any, interaction: any) => {
  const title = interaction.options.get("id").value;
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "findSeriesByName",
    query: `query findSeriesByName {
              findSeries(title: "${title}", numOfLimit: 0) {
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
  const { findSeries: series } = result.data.data;
  console.log(series[0]);
  if (interaction.options._subcommand === "series") {
    await interaction.reply({
      content: "A new series has been added",
      embeds: [seriesEmbed(series[0])],
    });
    return;
  }

  await interaction.reply(`API Latency: ${Math.round(client.ws.ping)}ms`);
};
