module.exports = {
  name: 'game',
  run: async (client,message,args) => {
    const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
    
let speed = 2;
const opponent = message.mentions.users.first();
    
let filter2 = (i) =>{
   if(i.user.id === opponent.id)  {
      return true;
   } else {
   return i.reply({content:'This is not for you',ephemeral:true})
        return false;
      
   }
}
   

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


    
    let who = null
		if(!opponent) return message.channel.send('Pls mention a second player');

  //  if(opponent.id === message.author.id) return message.channel.send('You cannot play against yourself')

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

    const accept = new MessageButton()
    .setLabel('ACCEPT')
    .setStyle('SUCCESS')
    .setCustomId('accept')

    const decline = new MessageButton()
    .setLabel('DECLINE')
    .setStyle('DANGER')
    .setCustomId('decline')

    const requestrow = new MessageActionRow()
    .addComponents(accept,decline)

    const request = new MessageEmbed()
    .setTitle('Game Request')
    .setDescription(`${message.author} has requested you for a game of \`swim race\`, would u like to race?`)
    .setColor('BLUE')

    

    const row = new MessageActionRow()
    .addComponents(btn1,btn2)

    const requestmsg = await message.channel.send({embeds:[request],components:[requestrow]})

    const requestcollector = requestmsg.createMessageComponentCollector({
      time: '60000',
      filter: filter2,
      type: 'BUTTON'
    })

    requestcollector.on('collect', async interaction => {
  if(interaction.customId === 'accept'){

    const accepted = new MessageEmbed(interaction.message.embeds[0].data)
    .setTitle('ACCEPTED')
    .setColor('GREEN')
    .setDescription(`This request from ${message.author} has been accepted by ${opponent}`)

    requestrow.components[0].disabled = true;
    requestrow.components[0].style = 'SUCCESS';
    requestrow.components[1].disabled = true;
    requestrow.components[1].style = 'SECONDARY';

    await interaction.update({embeds:[accepted],components:[requestrow]})
requestcollector.stop()
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

      if(interaction.customId === 'decline'){
        requestrow.components[0].disabled = true;
        requestrow.components[0].style = 'SECONDARY';
        requestrow.components[1].disabled = true;
        requestrow.components[1].style = 'DANGER'

        const declined = new MessageEmbed()
        .setTitle('Declined')
        .setDescription(`The game request from ${message.author} has been declined by ${opponent}!`)
        .setColor('RED')

        await interaction.update({embeds:[declined],components:[requestrow]})

        requestcollector.stop()
      }
  })

    requestcollector.on('end', async (collected,reason) => {
      if(reason === 'time'){
        requestrow.components[0].disabled = true;
        requestrow.components[1].disabled = true;

        const timeout = new MessageEmbed()
        .setTitle('Request Timed Out..')
        .setDescription(`The request for ${opponent} by ${message.author} has timed out!`)
        .setColor('YELLOW')

        await requestmsg.edit({components:[requestrow],embeds:[timeout]})
        await requestmsg.reply({content:'Dont want to play?, Alright!'})
      }
    })
  
}
}