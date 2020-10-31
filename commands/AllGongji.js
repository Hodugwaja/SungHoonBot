const discord = require("discord.js");
const client = new discord.Client('760769101206388796');

module.exports = {
    name : '전체공지',
    description : '서버 공지를 띄우는 역',
    
    execute(message, GongJi, guilds){
        const githubLink = "https://github.com/cropMr/Hyesung";
        const pictureLink = "https://imgur.com/g8FxihP.jpg";
        if(GongJi[2] !== undefined &&GongJi[3] !== undefined && GongJi[4] !== undefined){
            const embedGongJi = new discord.MessageEmbed()
                .setColor(`#${GongJi[2]}`)
                .setURL(githubLink)
                .setAuthor('성훈봇#9977', pictureLink, githubLink)
                .setDescription(`성훈봇 본부에서 나온 공지사항입니다\n\n**${GongJi[3]}**\n${GongJi[4]}\n\n\n\n문의하실 분들은 직접 호두과자#8981에 DM을 보내주시거나 메서드 소프트 본사에 문의해주시기 바랍니다 감사합니다`)
                .setThumbnail(`${message.author.avatarURL()}`)
                .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
            const user = client.users.cache.get(message.author.id);
            const channel = guilds.cache.find(ch => ch.topic == '#공지');
            const channelGongji = guilds.cache.find(ch => ch.name == '공지');
            const channelGongjiSahang = guilds.cache.find(ch => ch.name == '공지사항');
            if(channel){
                const Gongjis = guilds.cache.get(channel.id);
                Gongjis.send(embedGongJi);
                return undefined;
            }
            if(channelGongji){
                const Gongjis = guilds.cache.get(channelGongji.id);
                Gongjis.send(embedGongJi);
                return undefined;
            }
            if(channelGongjiSahang){
                const Gongjis = guilds.cache.get(channelGongjiSahang.id);
                Gongjis.send(embedGongJi);
                return undefined;
            }
            
                const Firstchannel = guilds.cache.filter(c => c.type === 'text').find(x => x.position == 0);
                const Gongjis = guilds.cache.get(Firstchannel.id);
                Gongjis.send(embedGongJi);
                    return undefined;
            
            return;
        }else{
            return 1;
        }   
    } 
     
}