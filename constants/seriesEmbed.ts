import { Colors, EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD, MAIN_URL } from "./url";
import { formatDuration } from "../utils/source";

//User is a user in Discord
export const SERIES_EMBEDED = (user: any, series: any, image: any) => {
  console.log(image);
  const defaultImage =
    "https://res.cloudinary.com/dgcvss8u6/image/upload/v1/anime-v2/cover/default-cover.jpg";
  console.log(series._episodes);
  const listEpisodes = series.episodes ? series.episodes : [];
  const webStatus =
    listEpisodes < series.total_episodes ? "Uploading" : "Finished";
  return new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: AVATAR_DISCORD(user),
    })
    .setColor(Colors.Blue)
    .setTitle(series.title.main_title)
    .setDescription(`${series.title.alt_title}\n\n${series.description}`)
    .setThumbnail(image ? image.source : defaultImage)
    .setURL(MAIN_URL(series.title.main_title, 1))
    .addFields(
      { name: "ID", value: `${series._id}`, inline: true },
      { name: "Type", value: `${series.type}`, inline: true },
      { name: "Episodes", value: `${series.total_episodes}`, inline: true },
      { name: "Status", value: `${series.status}`, inline: true },
      { name: "Web Status", value: `${webStatus}`, inline: true },
      {
        name: "Duration",
        value: `${formatDuration(series.duration)}`,
        inline: true,
      }
    );
};
