import axios from "axios";
import { Colors, EmbedBuilder } from "discord.js";
import { getImage } from "../utils/image";
import { SERIES_EMBEDED } from "../constants/seriesEmbed";

module.exports = async (client: any, interaction: any) => {
  const { user } = interaction.member;
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "randomSeries",
    query: `query randomSeries {
        randomSeries {
              _id
              title {
                main_title
                alt_title
              }
              duration
              description
              type
              total_episodes
              status
              season
              episodes {
                _id
              }
              images {
                type
                source
              }
            }
          }
        `,
    variables: {},
  });
  const { randomSeries: series } = result.data.data;
  const image: any = getImage(series.images, "cover");
  const randomSeriesEmbed = SERIES_EMBEDED(user, series, image);
  interaction.reply({
    content: `I will give you **${series.title.main_title}**`,
    fetchReply: true,
    embeds: [randomSeriesEmbed],
  });
};
