import axios from "axios";
import { errorEmbed } from "../utils/error";
import { Colors, EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD, MAIN_URL } from "../constants/url";
import { getImage } from "../utils/image";
import moment from "moment";

module.exports = async (client: any, interaction: any) => {
  const { user } = interaction.member;
  const seriesId = interaction.options.get("id").value;
  const epNum = interaction.options.get("ep").value;
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "searchEpisode",
    query: `query searchEpisode {
                searchEpisode(seriesId: "${seriesId}", epNum: ${epNum}) {
                    _id
                    title
                    epNum
                    source {
                      _id
                      kind
                    }
                    series {
                        title
                        images {
                          type
                          source
                        }
                    }
                    subtitles {
                      label
                    }
                    updated_at
                    created_at
                    view
                }
            }
          `,
    variables: {},
  });
  const { searchEpisode: episode } = result.data.data;
  if (episode === null) {
    await interaction.reply({
      embeds: [
        errorEmbed(
          user,
          `Episode is not available or the series id doesn't exist`,
          `Search episode`
        ),
      ],
    });
    return;
  }
  const image: any = getImage(episode.series.images, "cover");

  const listSubtitles: string = episode.subtitles
    .map((sub: any) => {
      return sub.label;
    })
    .join(", ");
  const listSources: string = episode.source
    .map((src: any) => {
      return src.kind === "onedrive" ? "Onedrive" : "Google Drive";
    })
    .join(", ");
  console.log(episode.source);
  const episodeEmbed = new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: AVATAR_DISCORD(user),
    })
    .setColor(Colors.Blue)
    .setTitle(episode.title)
    .setThumbnail(image.source)
    .setURL(MAIN_URL(episode.series.title, epNum))
    .addFields(
      {
        name: "Created At",
        value: `${moment(episode.created_at).format("MMMM Do YYYY")}`,
        inline: true,
      },
      {
        name: "Last Updated",
        value: `${moment(episode.updated_at).fromNow()}`,
        inline: true,
      },
      { name: "View", value: `${episode.view}`, inline: true },
      { name: "Subtitles", value: listSubtitles, inline: true },
      { name: "Video Sources", value: listSources, inline: true }
    );
  await interaction.reply({
    content: `Episode Info: **${epNum}** - From:  **${episode.series.title}**`,
    embeds: [episodeEmbed],
  });
};
