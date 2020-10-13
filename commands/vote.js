const discord = require("discord.js");
const client = new discord.Client();
const {token} = require('../config.json');


const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift();
    if(reactions.length > 0){
        setTimeout(() => addReactions(message, reactions), 750);
    }
}

const voteDiscord = async(client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id);
    channel.messages.fetch().then((message) => {
        channel.send(text).then(message => {
            addReactions(message, reactions);
        }) 
    })
}
module.exports = {
    name : '찬반투표',
    description : '찬성 반대로 투표하기',
    
    execute(message, args, pictureLink, githubLink){
        var contentsVote = "투표 내용 : ";
        for(var i = 2; i<args.length; i++){
            contentsVote += args[i] + " ";
        }
        const vote = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("성훈봇 제공 투표소")
            .setURL(pictureLink)
            .setAuthor('성훈봇#9977', pictureLink, githubLink)
            .setDescription(`${message.author.username}` + "님이 제안한 투표입니다")
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addField('투표하는 법', "해당 메시지의 O(찬성), X(반대) 이모지를 클릭하시면 됩니다", false)
            .addField('투표내용', `${contentsVote}`, false)
            .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        
        voteDiscord(client, `${message.channel.id}`, vote, ['⭕', '❌']);  
    }
}

client.login(token);