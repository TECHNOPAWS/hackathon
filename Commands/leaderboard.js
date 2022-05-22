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
    if (!a || a == null) return message.channel.send({ embeds: [nodata] });

    let users = [];
    let wins = [];
    let looses = [];

    a.slice(0, 10).forEach((x) => {
      users.push(x.userid);
      wins.push(x.wins);
      looses.push(x?.loses ?? 0);
    });

   const Players = users.concat(Array(10-users.length).fill('???'));
    
   const Wins =  wins.concat(Array(10-wins.length).fill(0));
    
    const Loses = looses.concat(Array(10-looses.length).fill(0));

    const embed = new MessageEmbed()
      .setTitle("LeaderBoard")
      .setColor("RANDOM")
      .addField(`Player`, Players.join('\n'), true)
      .addField(`Wins`, Wins.join("\n"), true)
      .addField(`Looses`, Loses.join("\n"), true);

    message.channel.send({ embeds: [embed] });
  },
};