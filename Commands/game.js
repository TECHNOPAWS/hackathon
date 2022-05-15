const { MessageButton, MessageActionRow } = require('discord.js')
module.exports = {
  name: 'game',
  run: async (client,message,args) => {
    const opponent = message.mentions.users.first();

		if(!opponent) return message.channel.send('Pls mention a second player');

    const positions = {
      first: '🏁▪▪▪▪▪▪▪▪:man_swimming:',
      second: '<:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968>',
      third:`🏁▪▪▪▪▪▪▪▪:man_swimming:`,
      fourth:'<:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968><:blue:975313938621267968>'
    }

    positions.first = positions.first.split(' ')
    positions.third = positions.third.split(' ')


    const one = String(Math.random())
    const two = String(Math.random())

    const btn1 = new MessageButton()
    .setLabel('Opponent 1')
    .setStyle('PRIMARY')
      .setCustomId(one)

    const btn2 = new MessageButton()
    .setLabel('Opponent 2')
    .setStyle('PRIMARY')
      .setCustomId(two)

    const row = new MessageActionRow()
    .addComponents(btn1,btn2)

    message.channel.send({/* content:`${positions.first}\n${positions.second}\n${positions.third}\n${positions.fourth}`,components:[row] */content: positions.first + '\n' + positions.second +'\n'+
      positions.third.join('') + '\n' + positions.fourth ,
			components: [row]})
    
    
  }
}