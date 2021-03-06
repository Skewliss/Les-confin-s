const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: true
});
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '!';

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});


const DiscordAntiSpam = require("discord-anti-spam");
const AntiSpam = new DiscordAntiSpam({
  warnThreshold: 4, 
  banThreshold: 7, 
  maxInterval: 2000, 
  warnMessage: "S'il te plait {@user}, arrête de spam", 
  banMessage: "**{user_tag}** a été banni pour avoir spam.", 
  maxDuplicatesWarning: 7, 
  maxDuplicatesBan: 15, 
  deleteMessagesAfterBanForPastDays: 1, 
  exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR", "MANAGE_GUILD", "BAN_MEMBERS"], 
  ignoreBots: true, 
  verbose: false, 
  ignoredUsers: [], 
  ignoredRoles: [], 
  ignoredGuilds: [], 
  ignoredChannels: [] 
});
 
AntiSpam.on("warnEmit", (member) => console.log(`Attempt to warn ${member.user.tag}.`));
AntiSpam.on("warnAdd", (member) => console.log(`${member.user.tag} a été averti.`));
AntiSpam.on("kickEmit", (member) => console.log(`Attempt to kick ${member.user.tag}.`));
AntiSpam.on("kickAdd", (member) => console.log(`${member.user.tag} a été kick.`));
AntiSpam.on("banEmit", (member) => console.log(`Attempt to ban ${member.user.tag}.`));
AntiSpam.on("banAdd", (member) => console.log(`${member.user.tag} a été banni.`));
AntiSpam.on("dataReset", () => console.log("Le module cache a été clear."));
 
client.on("ready", () => console.log(`Logged in as ${client.user.tag}.`));
 
client.on("message", (msg) => {
  AntiSpam.message(msg);
});

client.on("guildMemberAdd", user =>{
  let joinEmbed = new Discord.RichEmbed()
  .setColor("#52f411")
  .setAuthor(user.user.username, user.user.displayAvatarURL)
  .setDescription(":grin: Bienvenue " + user + " sur notre serveur **" + user.guild.name + "** !")
  .setFooter("Les confinés | By Skewliss", 'https://i.imgur.com/t6nodSy.png')
  user.guild.channels.get("781862895876440064").send(joinEmbed)
});

client.on("guildMemberRemove", user =>{
  let leaveEmbed = new Discord.RichEmbed()
  .setColor("#f41111")
  .setAuthor(user.user.username, user.user.displayAvatarURL)
  .setDescription(":cry: Sniff... " + user + " a quitté notre serveur **" + user.guild.name + "** !")
  .setFooter("Les confinés | By Skewliss", 'https://i.imgur.com/t6nodSy.png')
  user.guild.channels.get("781862895876440064").send(leaveEmbed)
});

client.on("message", message => {
  if(message.author.bot) return;

  if(message.content == prefix + "serveur"){
    message.reply("Voici l'ip du serveur: 176.57.160.241:12891");
    message.channel.send("Clique sur F1 dans le menu du jeu, et écrit : connect 176.57.160.241:12891 ");
  }
});

client.on("message", message => {
  if(message.author.bot) return;

  if(message.content == prefix + "wipe"){
    message.reply("nous ne savons toujours pas la date du wipe :worried:");
  }
});


client.login(process.env.TOKEN);
