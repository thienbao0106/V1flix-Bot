import axios from "axios";
import { EmbedBuilder } from "discord.js";

module.exports = async (client: any, interaction: any) => {
  const keyword = interaction.options.get("keyword").value;
  const { user } = interaction.member;
  const embed = new EmbedBuilder().setAuthor({
    name: user.globalName,
    iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  });
  const result = await axios.post(process.env.SERVER_API || "", {
    operationName: "findSeriesByName",
    query: `query findSeriesByName {
        findSeries(title: "Yuru Camp") {
          title
        }
      }
    `,
    variables: {},
  });
  console.log(result.data.data.findSeries[0]);

  await interaction.reply({
    embeds: [embed],
  });
};
