import axios from "axios";
import { Colors, EmbedBuilder } from "discord.js";
import { getImage } from "../utils/image";
import { AVATAR_DISCORD, MAIN_URL } from "../constants/url";

module.exports = async (client: any, interaction: any) => {
  const { user } = interaction.member;
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "randomSeries",
    query: `query randomSeries {
        randomSeries {
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
  const { randomSeries: series } = result.data.data;
  const image: any = getImage(series.images, "cover");

  const randomSeriesEmbed = new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: AVATAR_DISCORD(user),
    })
    .setColor(Colors.Blue)
    .setDescription(series.description)
    .setThumbnail(image.source)
    .setTitle(series.title)
    .setURL(MAIN_URL(series.title, 1))
    .addFields(
      { name: "Type", value: `${series.type}`, inline: true },
      { name: "Episodes", value: `${series.total_episodes}`, inline: true },
      { name: "Status", value: `${series.status}`, inline: true }
    );
  interaction.reply({
    content: `I will give you **${series.title}**`,
    fetchReply: true,
    embeds: [randomSeriesEmbed],
  });
};
