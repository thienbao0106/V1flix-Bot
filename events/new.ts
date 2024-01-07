import { Colors, EmbedBuilder } from "discord.js";
import { getImage } from "../utils/image";
import axios from "axios";
import { MAIN_URL } from "../constants/url";

const seriesEmbed = (series: any) => {
  const image: any = getImage(series.images, "cover");

  return new EmbedBuilder()
    .setImage(image.source)
    .setColor(Colors.Green)
    .setTitle(series.title.main_title)
    .setTimestamp()
    .addFields({
      name: "URL",
      value: MAIN_URL(series.title.main_title, 1),
      inline: false,
    });
};

const episodeEmbed = (episodes: any, images: any, title: string) => {
  console.log(images);
  const image: any = getImage(images, "cover");
  const latestEpisode = episodes[episodes.length - 1];
  return new EmbedBuilder()
    .setTimestamp()
    .setTitle(`New ep: ${latestEpisode.epNum}`)
    .setImage(image.source)
    .setDescription(latestEpisode.title)
    .addFields({
      name: "URL",
      value: MAIN_URL(title, latestEpisode.epNum),
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
                title {
                  main_title
                  alt_title
                }
                images {
                  type
                  source
                }
                episodes {
                  _id
                  title
                  epNum
                }
                
              }
            }
          `,
    variables: {},
  });
  const { findSeries: series } = result.data.data;

  if (interaction.options._subcommand === "series") {
    await interaction.channel.send({
      content: "A new series has been added",
      embeds: [seriesEmbed(series[0])],
    });
    return;
  }

  await interaction.channel.send({
    content: `A new episodes has been added for ${title}`,
    embeds: [
      episodeEmbed(series[0].episodes, series[0].images, series[0].title),
    ],
  });
  return;
};
