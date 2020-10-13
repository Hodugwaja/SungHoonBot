const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();
const {prefix, token} = require('./config.json')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new discord.Collection();
const ManagerList = ['533120411274182666', /*'707154302506106931',*/ '621868814384234566'] // 호두과자, 카나미, 맥심 아이디
const DeveloperList = ['533120411274182666', /*'707154302506106931',*/ '621868814384234566'];
const command = require('./commands/command')
const githubLink = "https://github.com/cropMr/Hyesung";
const pictureLink = "https://imgur.com/g8FxihP.jpg";
const activities_list = [
    "NULL", 
    "선수 육성",
    "연봉협상",
    "맥심 생기부 작성",
    "시그마 가르치기",
    "규카츠를 먹고싶어"
];



for (const file of commandFiles){
    const commandList = require(`./commands/${file}`);
    client.commands.set(commandList.name, commandList);
    console.log(commandList);
}


client.on('ready', () => {
    console.log(`logged in as ${client.user.tag} `);
        
    let guilds = client.guilds.cache.map(guild => guild.id)
    
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000); 
    
});


client.on("message", (message) => {
    let args = message.content.split(' ');
    let GongJi = message.content.split('.');
    if(message.author.bot) {
        return NaN
    }
    if (message.channel instanceof discord.DMChannel){
        noDm = client.users.cache.get(message.author.id);
        noDm.send("DM으로 하지마 미친놈아");
        return undefined;
    }
    if(message.content === "성훈아"){
        message.reply("님 부르셨습니까?");
        return;
    }
    
    /*
    var check_emoji = /<:[\w]*:[\d]*>/.exec(message.content);
    if(check_emoji !== null) {
        var id = /[\d]*>/.exec(check_emoji)[0].substr(0, /[\d]*>/.exec(check_emoji)[0].length -1);
        message.delete()
        message.channel.send(`https://cdn.discordapp.com/emojis/${id}.png?size=256`);
    }
    */
    
    if(GongJi[1] === '서버공지'){
        if(message.member.hasPermission(['ADMINISTRATOR'])){
            switch(client.commands.get(GongJi[1]).execute(message, GongJi)){
                case 1:
                    const wrongWriting = client.users.cache.get(message.author.id);
                    const embedNoCondition = new discord.MessageEmbed()
                        .setColor(`#${GongJi[2]}`)
                        .setURL(githubLink)
                        .setAuthor('성훈봇#9977', pictureLink, githubLink)
                        .setDescription(`${message.author.username}` + "님, 입력 방식이 오류가 있는것 같네요. 다음 설명서를 읽고 다시한번 입력해주시기 바립니다")
                        .setThumbnail(`${message.author.avatarURL()}`)
                        .addFields(
                        { name: '하는법', value: "성훈아.공지.(임베드색(16진수)).(공지제목).(공지내용)", inline: false },
                        { name: '예시', value: '성훈아.공지.ffffff.맥심 설명.맥심초보에다가 2D 여친인 베리가 있어...', inline: false },  
                    )
                    .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
                    wrongWriting.send(embedNoCondition);
                    break;
            }

        
        } else {
        const noUser = client.users.cache.get(message.author.id);
        const embedNoUser = new discord.MessageEmbed()
            .setColor(`#${GongJi[2]}`)
            .setURL(githubLink)
            .setAuthor('성훈봇#9977', pictureLink, githubLink)
            .setDescription(`${message.author.username}` + "님, 잘못된 접근입니다. 해당 명령어는 해당 서버 관리자만 할 수 있습니다")
        .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        noUser.send(embedNoUser);
        }
        return;
    }if(GongJi[1] === '전체공지'){
        for(var i = 0; i<ManagerList.length; i++){
            if(ManagerList[i] === message.author.id){
                
                let guilds = client.guilds.cache.map(guild => guild.channels);
                for(var j = 0; j<guilds.length; j++){
                    client.commands.get(GongJi[1]).execute(message, GongJi, guilds[j])
                }
                message.reply("공지를 보냈습니다");
                return;
            }
        }
        const noUser = client.users.cache.get(message.author.id);
        const embedNoUser = new discord.MessageEmbed()
            .setColor(`#${GongJi[2]}`)
            .setURL(githubLink)
            .setAuthor('성훈봇#9977', pictureLink, githubLink)
            .setDescription(`${message.author.username}` + "님, 잘못된 접근입니다. 해당 명령어는 운영자들만 할 수 있습니다")
        .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        noUser.send(embedNoUser);
    }
    if (!message.content.startsWith(prefix)) return;
    if(args[1] === '도움말') {
        const embed = new discord.MessageEmbed()
        .setColor(`#ffff00`)
        .setDescription("**규카츠 먹고 싶다**")
        message.channel.send(embed)
        return;
    }
   
    else{
    try{
        client.commands.get(args[1]).execute(message, args);
    }catch(error){ 
        if(error == "TypeError: Cannot read property 'execute' of undefined"){
            message.reply("없는 명령어 입니다\n'성훈아 도움말' 을 통해 확인하십쇼");
        }else{
                message.reply("흠... 명령어를 잘못 입력하거나 오류가 걸린것 같습니다. 개발자들에게 자동으로 문의가 들어갑니다");
                for(var i = 0; i<DeveloperList.length; i++){
                    const managerBug = client.users.cache.get(DeveloperList[i]);
                            const embedNoCondition = new discord.MessageEmbed()
                            .setColor(`#${GongJi[2]}`)
                            .setURL(githubLink)
                            .setAuthor('성훈봇#9977', pictureLink, githubLink)
                            .setDescription(`성훈봇이 돌아간던 중에 **${message.author.username}**` + "님이 입력한 내용에 버그가 발생했습니다")
                            .setThumbnail(`${message.author.avatarURL()}`)
                            .addFields(
                            {name : "입력 내용", value : `${message.content}`, inline : false },
                            { name: '오류', value: `${error}`, inline: false }, 
                        )
                        .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
                        managerBug.send(embedNoCondition);
                }
            }
        }
    }
});/*
const { Client } = require('discord.js')
const ytdl = require('ytdl-core')
const YouTube = require("simple-youtube-api")
const {prefix, token} = require('../config.json');
const client = new Client({ disableEveryone: true })
const youtube = new YouTube('')

const queue = new Map()

client.on('message', async message => {

    const args = message.content.substring(prefix.length).split(" ")
    const searchString = args.slice(1).join(' ')
    const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ""
    const serverQueue = queue.get(message.guild.id)

    if(message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("노래를 들으려면 음성 채널에 참가해야 합니다.")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("I don\'t have permissions to connect to the voice channel")
        if(!permissions.has('SPEAK')) return message.channel.send("I don\'t have permissions to speak in the channel")

        try {
            var video = await youtube.getVideoByID(url)
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 1)
                var video = await youtube.getVideoByID(videos[0].id)
            } catch {
                return message.channel.send('I couldn\'t find any search results')
            }
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)
            
            queueConstruct.songs.push(song)

            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`오류 났어요!: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`오류: ${error}`)
            }
        } else {
            serverQueue.songs.push(song)
            return message.channel.send(`**${song.title}** has been added to the queue`)
        }
        return undefined

    } else if(message.content.startsWith(`${prefix}stop`)) {
        if(!message.member.voice.channel) return message.channel.send("노래를 멈추려면 음성 채널에 참가해야 합니다.")
        if(!serverQueue) return message.channel.send("아무 노래도 부르고 있지 않습니다.")
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        message.channel.send("노래를 멈췄습니다")
        return undefined
    } else if(message.content.startsWith(`${prefix}skip`)) {
        if(!message.member.voice.channel) return message.channel.send("노래를 건너뛰려면 음성 채널에 참가해야 합니다.")
        if(!serverQueue) return message.channel.send("아무 노래도 부르고 있지 않습니다.")
        serverQueue.connection.dispatcher.end()
        message.channel.send("노래를 건너뛰었습니다.")
        return undefined
    } else if(message.content.startsWith(`${prefix}volume`)) {
        if(!message.member.voice.channel) return message.channel.send("volume 커맨드를 이용하려면 음성 채널에 참가해야 합니다.")
        if(!serverQueue) return message.channel.send('')
        if(!args[1]) return message.channel.send(`That volume is: **${serverQueue.volume}**`)
        if(isNaN(args[1])) return message.channel.send('That is not a valid amount to change the volume to')
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        message.channel.send(`I have changed the volume to: **${args[1]}**`)
        return undefined
    } else if(message.content.startsWith(`${prefix}np`)) {
        if(!serverQueue) return message.channel.send("There is nothing playing")
        message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`)
        return undefined
    } else if(message.content.startsWith(`${prefix}queue`)) {
        if(serverQueue) return message.channel.send("There is nothing playing")
        message.channel.send(`
        __**song Queue**__
        ${serverQueue.songs.map(song => `**-** ${song.title}.join('\n)`)}

        **Now Playing:** ${serverQueue.songs[0].title}
        `, { split: true})
        return undefined
    } else if(message.content.startsWith(`${prefix}pause`)) {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the pause command")
        if(!serverQueue) return message.channel.send("There is nothing playing")
        if(!serverQueue.playing) return message.channel.send("The music is aleady paused")
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send("I have now paused the music for you")
        return undefined
    } else if(message.content.startsWith(`${prefix}resume`)) {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the resume command")
        if(!serverQueue) return message.channel.send("There id nothing playing")
        if(serverQueue.playing) return message.channel.send("The music aleady playing")
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send("I have now resumed the music for you")
        return undefined
    } else if(message.content.startsWith(`${prefix}now playing`)) {
        message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`)
        return undefined
    } else if(message.content.startsWith(`${prefix}p`)) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("노래를 들으려면 음성 채널에 참가해야 합니다.")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("I don\'t have permissions to connect to the voice channel")
        if(!permissions.has('SPEAK')) return message.channel.send("I don\'t have permissions to speak in the channel")

        try {
            var video = await youtube.getVideoByID(url)
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 1)
                var video = await youtube.getVideoByID(videos[0].id)
            } catch {
                return message.channel.send('I couldn\'t find any search results')
            }
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)
            
            queueConstruct.songs.push(song)

            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`오류 났어요!: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`오류: ${error}`)
            }
        } else {
            serverQueue.songs.push(song)
            return message.channel.send(`**${song.title}** has been added to the queue`)
        }
        return undefined
    }

    switch(message.content){
        case `${prefix}help`:
            message.channel.send("명령어 목록: ,play ,p ,stop ,pause ,resume ,queue ,np ,now playing ,skip ,volume")
    }
});
function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if(!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
    })
    .on('error', error => {
        console.log(error)
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

    serverQueue.textChannel.send(`Start Playing: **${song.title}**`)
} 
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

*/
client.login(token);
//https://discordapp.com/oauth2/authorize?client_id=760769101206388796&scope=bot&permissions=8
//https://discordapp.com/oauth2/authorize?client_id=762682938252591114&scope=bot&permissions=8
