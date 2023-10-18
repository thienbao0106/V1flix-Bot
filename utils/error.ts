import { Colors, EmbedBuilder } from "discord.js";
import { AVATAR_DISCORD } from "./url";

export const errorEmbed = (user: any, message: string, title: string) => {
  return (
    new EmbedBuilder()
      .setAuthor({
        name: user.globalName,
        iconURL: AVATAR_DISCORD(user),
      })
      .setColor(Colors.Red)
      .setDescription(message)
      // .setThumbnail(image.source)
      .setTitle(title)
  );
};
