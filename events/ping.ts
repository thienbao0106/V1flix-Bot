module.exports = async (client: any, interaction: any) => {
  await interaction.reply(`API Latency: ${Math.round(client.ws.ping)}ms`);
};
