const { MessageEmbed } = require("discord.js");
const schema = require("../Schema/lb.js");

const nodata = new MessageEmbed()
  .setTitle("No data Found..")
  .setDescription(
    "There hasnt been any games in this server. do `?game @user` to play against someone"
  )
  .setColor("RED");

module.exports = {
  name: ["leaderboard", "lb"],
  run: async (client, message, args) => {
    
    const a = await schema.find({ guild: message.guild.id }).sort({ wins: -1 });
    if (!a) return message.channel.send({ embeds: [nodata] });

    let users = [];
    let wins = [];
    let looses = [];

    a.forEach((x) => {
      users.push(x.userid);
      wins.push(x.wins);
      looses.push(x?.loses ?? 0);
    });

    const embed = new MessageEmbed()
      .setTitle("LeaderBoard")
      .setColor("RANDOM")
      .addField(`Player`, users.join("\n"), true)
      .addField(`Wins`, wins.join("\n"), true)
      .addField(`Looses`, looses.join("\n"), true);

    message.channel.send({ embeds: [embed] });
  },
};