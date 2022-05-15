const { Client, Collection } = require('discord.js')
const fs = require('fs')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL','MESSAGE']
})
const prefix = `?`

client.commands = new Collection()

const commandHandler = fs.readdirSync("./Commands")

for(file of commandHandler){
  if(!file.endsWith(".js")) {
     fs.readdirSync("./Commands").filter(file => !file.endsWith(".js")).forEach(dir => {
         const f = fs.readdirSync(`./Commands/${dir}`).filter(file => file.endsWith(".js"))
      f.forEach(x => {         
   let commandName = x.split(".")[0]
 let command =  require(`./Commands/${dir}/${commandName}`)
   client.commands.set(command.name, command)
   })
  })
 }
  if(file.endsWith(".js")) {
    let commandName = file.split(".")[0]
    let command = require(`./Commands/${commandName}`)
 client.commands.set(command.name, command)
}
}

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix)){
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
     const command = client.commands.find(cmd => cmd.name.includes(commandName))
    
    if(!command) return; /* console.log(`${message.author.tag} used and undefined command`); */
    command.run(client, message, args)  
 }


})

client.login(process.env.token)