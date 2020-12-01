const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    message.channel.send({
        embed: {
            color: 0x0dff0d,
            title: `Connection au serveur Les confinés`,
            description: `Clique sur F1 dans le menu du jeu, et écrit :
             **connect 176.57.160.241:12891** `,
            image: {
            url: "https://media.giphy.com/media/94DBMnpVEbJLy/giphy.gif"
            }, 
            footer: {
                text: `Bon jeu à toi ${membre.user.username} ! 😁`
            }
        }
    });
};

module.exports.help = {
    name: "connection"
}