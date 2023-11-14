import axios from "axios";
import { checkSource } from "../utils/source";
import { EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD } from "../constants/url";

const sourceEmbeded = (listSource: any[], title: string, user: any) => {
  const description = listSource
    .map((src: any) => `${src.kind} - ${src.status}`)
    .join("\n");
  return new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: AVATAR_DISCORD(user),
    })
    .setTitle(`Status of ${title}`)
    .setDescription(description);
};

module.exports = async (client: any, interaction: any) => {
  const { user } = interaction.member;
  const episodeId = interaction.options.get("id").value;
  let sources = [];
  await interaction.deferReply({ ephemeral: true });

  if (episodeId === "") {
    await interaction.reply(`Episode id and kind mustn't be empty`);
    return;
  }
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "findEpisode",
    query: `query findEpisode {
        findEpisode(episodeId: "${episodeId}") {
                    _id
                    title
                    source {
                      _id
                      kind
                      value
                    }
                    subtitles {
                      label
                      lang
                      source {
                        _id
                        kind
                        value
                      }
                    }
              
                }
            }
          `,
    variables: {},
  });
  const { findEpisode: episode } = result.data.data;
  if (interaction.options._subcommand === "video") {
    sources = episode.source.map((src: any) => {
      const srcStatus = checkSource(src.value);
      return {
        kind: src.kind,
        status: srcStatus ? "Online" : "Offline",
      };
    });
  } else {
    const lang = interaction.options.get("lang").value;
    const subLang = episode.subtitles.find((sub: any) => sub.lang === lang);

    sources = subLang.source.map((src: any) => {
      const srcStatus = checkSource(src.value);
      return {
        kind: src.kind,
        status: srcStatus ? "Online" : "Offline",
      };
    });
  }
  if (sources.length > 0)
    await interaction.editReply({
      embeds: [sourceEmbeded(sources, episode.title, user)],
    });
  return;
};
