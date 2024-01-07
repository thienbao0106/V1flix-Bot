import { Colors, EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD, USER_URL } from "./url";

const randomFavorite = (favorites: any) => {
  return favorites[Math.floor(Math.random() * favorites.length)];
};

export const USER_EMBEDED = (user: any, foundUser: any) => {
  const defaultImg =
    "https://res.cloudinary.com/dgcvss8u6/image/upload/v1/anime-v2/thumbnail/avatar.png";
  return new EmbedBuilder()
    .setAuthor({
      name: user.globalName,
      iconURL: AVATAR_DISCORD(user),
    })
    .setColor(Colors.Blue)
    .setTitle(foundUser.username)
    .setURL(USER_URL(foundUser.username))
    .setImage(foundUser.avatar || defaultImg)
    .setDescription("What's your thought")
    .setFields(
      { name: "ID", value: `${foundUser._id}`, inline: true },
      {
        name: "Favorite",
        value: `${
          foundUser.favoriteList.length > 0
            ? randomFavorite(foundUser.favoriteList).title.main_title
            : `No Favorite`
        }`,
        inline: true,
      },
      {
        name: "Total Episodes",
        value: `${foundUser.total_episodes || 0}`,
        inline: true,
      },
      {
        name: "Days Watched",
        value: `${foundUser.days_watched || 0}`,
        inline: true,
      }
    );
};
