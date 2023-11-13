import { Colors, EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD, MAIN_URL } from "./url";

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
    .setDescription(series.description)
    .setThumbnail(image ? image.source : defaultImage)
    .setTitle(series.title)
    .setURL(MAIN_URL(series.title, 1))
    .addFields(
      { name: "ID", value: `${series._id}`, inline: true },
      { name: "Type", value: `${series.type}`, inline: true },
      { name: "Episodes", value: `${series.total_episodes}`, inline: true },
      { name: "Status", value: `${series.status}`, inline: true },
      { name: "Web Status", value: `${webStatus}`, inline: true }
    );
};
