//https://imgur.com/hkbS86A.jpg

const Discord = require("discord.js");

module.exports = {
    name : '치킨',
    description : '이겼닭 오늘 저녁은 치킨이닭',
    
    execute(message, args){
        function random(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
            
        }
        switch(random(1, 100)){
            case 1 : message.channel.send("이겼닭 치킨이나 시켜먹어닭?")
            default : message.reply("없는 명령어 입니다\n'성훈아 도움말' 을 통해 확인하십쇼");
        }
    }
}