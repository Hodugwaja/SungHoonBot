const Discord = require("discord.js");

module.exports = {
    name : '초대',
    description : '초대링크',
    
    execute(message, args){
        const serverInfo = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('성훈봇 초대링크')
        .setURL('https://discordapp.com/oauth2/authorize?client_id=760769101206388796&scope=bot&permissions=8')
        .setAuthor('성훈봇#9977', 'https://imgur.com/g8FxihP.jpg', 'https://github.com/cropMr/Hyesung')
        .setDescription(`${message.author.username}` + "님이 요청하신 봇 초대 링크입니다")
        .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');

        message.channel.send(serverInfo);   
    }
}