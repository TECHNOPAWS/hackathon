const { MessageButton, MessageActionRow } = require('discord.js')
let speed = 2

function format(positions) {
  return positions.first.map(item => {
      switch(item) {
        case `f`: {
          return `🏁`
        }
        case `b`: {
          return `▪`
        }
        case `m`: {
          return `:man_swimming:`
        }
      }
    }).join(``) + '\n' + `<:blue:975313938621267968>`.repeat(10)+'\n'+
      positions.second.map(item => {
      switch(item) {
        case `f`: {
          return `🏁`
        }
        case `b`: {
          return `▪`
        }
        case `m`: {
          return `:man_swimming:`
        }
      }
    }).join(``) + '\n' + `<:blue:975313938621267968>`.repeat(10)
}

module.exports = {
  name: 'game',
  run: async (client,message,args) => {
    const opponent = message.mentions.users.first();
    let who = null
		if(!opponent) return message.channel.send('Pls mention a second player');

    if(opponent.id === message.author.id) return message.channel.send('You cannot play against yourself')

    if(opponent.bot /* || opponent.id === '864412190010245121' */) return message.reply('You cannot play againt bots. Sorry not sorry! Don\'t care didn\'t ask + ratio + cope + counter ratio + skill issue + cry about it + pinged owner + canceled + <:what:968876036521623582> + blocked')
    let positions = {
      first: [`f`, `b`, `b`, `b`, `b`, `b`, `b`, `b`, `b`, `m`],
      second: [`f`, `b`, `b`, `b`, `b`, `b`, `b`, `b`, `b`, `m`]
    }

    const one =  String(Math.random())
    const two =  String(Math.random())

    const btn1 = new MessageButton()
    .setLabel(message.author.username)
    .setStyle('PRIMARY')
    .setCustomId(one)

    const btn2 = new MessageButton()
    .setLabel(opponent.username)
    .setStyle('PRIMARY')
    .setCustomId(two)

    const row = new MessageActionRow()
    .addComponents(btn1,btn2)

    const msg = await message.channel.send({
      content: format(positions), components: [row]})

    const filter = (button) => {
      if(button.user.id === message.author.id || button.user.id === opponent.id) return true
      button.reply({ content: `Not for you`, ephemeral: true })
      return false
    };
      
		const game = message.channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		})
    function update(who) {
			if(who) {
				game.stop();
	 			const e = row.components[0]//.disabled = true;
				const j = row.components[1]//.disabled = true;

        if(e.label === who.username){
          e.disabled = true;
          e.style = 'SUCCESS';
          j.style = 'SECONDARY'
          j.disabled = true;
        }
        if(j.label === who.username){
          j.disabled = true;
          j.style = 'SUCCESS';
          e.style = 'SECONDARY';
          e.disabled = true;
        }
        
        
      
				msg.reply(`${who.username} won`);
			}

			msg.edit({
				content: format(positions),
				components: [row],
			})
		}

		game.on('collect', async button => {
			//button.deferUpdate();
      if(button.customId === one) {
        if(button.user.id === message.author.id) {
          await button.deferUpdate()
          let newPosition = [],
            last = positions.first.findIndex(item => item === `m`)
          positions.first.forEach((item, index) => {
            let toPush = item
            if(index === last - 1) toPush = `m`
            if(index === last) toPush = `b`
            newPosition.push(toPush)
          })
          positions.first = newPosition
        } else {
         await button.reply({ content: `Not for you`, ephemeral: true })
        }
      }
      
      if(button.customId === two) {
        if(button.user.id === opponent.id) {
          await button.deferUpdate()
          let newPosition = [],
            last = positions.second.findIndex(item => item === `m`)
          positions.second.forEach((item, index) => {
            let toPush = item
            if(index === last - 1) toPush = `m`
            if(index === last) toPush = `b`
            newPosition.push(toPush)
          })
          positions.second = newPosition
        
      
      //console.log(msg.components[0].components[0])
     
      } else {
          return await button.reply({ content: `Not for you`, ephemeral: true })
      }
      } 
        if(positions.first[1] === `m`){
        who = message.author
      };
      
      if(positions.second[1] === `m`){
        who = opponent;
        
      } 
      update(who)
		});
  }
}