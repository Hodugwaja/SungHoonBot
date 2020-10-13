const Discord = require("discord.js");

module.exports = {
    name : '서버정보',
    description : '서버정보 출력',
    execute(message, args){
        const serverInfo = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('성훈봇 조사 보고서')
        .setURL('https://github.com/cropMr/Hyesung')
        .setAuthor('성훈봇#9977', 'https://imgur.com/g8FxihP.jpg', 'https://github.com/cropMr/Hyesung')
        .setDescription(`${message.author.username}` + "님이 요청한 서버조사 결과입니다")
        .setThumbnail(`${message.guild.iconURL()}`)
        .addFields(
            { name: '서버 이름', value: `${message.guild.name}  `, inline: false},
            { name: '서버 인원', value: `${message.guild.memberCount}명`, inline: false },
            { name: '서버 개설일', value: `${message.guild.createdAt}`, inline: false },
        )
        .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');

        message.channel.send(serverInfo);
        
    }
}

/*
module.exports = (client, aliases, callback) => {
    if(typeof aliases === 'string'){
        aliases = [aliases]
    }
    client.on('message', (message) = {
        console.log(`running the command ${command}`);
        callback();
    })
}

*/