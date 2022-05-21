const { MessageEmbed } = require('discord.js')
const schema = require('../Schema/lb.js')

const nodata = new MessageEmbed()
.setTitle('No data Found..')
.setDescription('There hasnt been any games in this server. do `?game @user` to play against someone')
.setColor('RED')

module.exports = {
  name: ['leaderboard','lb'],
  run: async(client,message,args) => {
    
    const lb = await schema.find({
      guild: message.guild.id
    })
  
    if(!lb || lb == null) return message.channel.send({embeds:[nodata]})
  const e = lb.map(e => `${e.userid}  ${e.matches}`).join('\n')
     if(lb){ 
      
     
      const a = await schema.findOne({guild:message.guild.id}).sort({matches: -1})
       
    const embed = new MessageEmbed()
    .setTitle('LeaderBoard')
    .setColor('RANDOM')
    .setDescription(`${e}`)
    .addFields({
      name:'First',
      value:`${a.userid}`,
      inline: true
    },
   {
     name:'Matches',
     value:`${a.matches}`,
     inline: true
   })
    /* .addField('Matches',`${a.matches}`, true) */
  


    
      message.channel.send({embeds:[embed]})
   }
  }
}