//700551690008395796
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag} `);
    client.user.setActivity("규카츠 먹고 싶다")
});
client.on('message', (message) => {
    if(message.author.bot) {
        return NaN
    }
    var nim = '533120411274182666';
    var GalCon = client.users.cache.get(nim);
    for(var i = 0; i<5; i++){
        GalCon.send("너는 빡빡이다");
    }
});

client.login('NzA2NTMzOTA5NTk2MjA5MTcy.Xq7o-g.JAT2WC3sJRi4k7yPhsOub19nAVI');
//