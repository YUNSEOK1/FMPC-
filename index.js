const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const {prefix , token} = require('./config.json')
const fs = require('fs')

//봇 구매 감사합니다. made bot by. ! HELLO#7450 2차 배포 ,  리셀은 절대적으로 금지됩니다.

client.once('ready',() => {
    let number = 0
    setInterval(() => {
        const list = ["봇 구매 감사드립니다." , "made by ! HELLO #7450", "새해복 많이 받으세요"]
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type:"PLAYING"
        })
        number++
    }, 5000) //몇초마다 상태메세지를 바꿀지 정해주세요 (1000 = 1초)
    console.log(`봇 이 켜졌습니다. 봇 구매 감사드립니다. 이름 : ${client.user.tag}`)
})

client.on('messageCreate' , message=>{
    if(message.content == "핑"){
        message.reply("퐁")
    }
})

client.on('guildMemberAdd', x => {
    client.channels.cache.get('입장 로그를 남길 채널 ID').send(`**<@${x.user.id}> 님 어서오세요.**`)

})

client.on('guildMemberRemove', x => {
    client.channels.cache.get('퇴장 로그를 남길 채널 ID').send(`**${x.user.tag} 님 이 서버에서 퇴장했습니다.** ` )
})

client.on('voiceStateUpdate', async (newState,oldState)=>{
    const channel = newState.guild.channels.cache.find(c=> c.name === "🔊ㆍ음성채널 만들기");//라는 이름으로 채널을 똑같이 생성하셔야 적용이 됩니다.
    if(newState.member.voice.channel){
        if(newState.member.voice.channel.id !== channel.id || !channel) return 
        newState.guild.channels.create(`🔊ㆍ ${newState.member.user.username} 님 의 음성채널`,{
            type:"GUILD_VOICE",
            parent: oldState.channel.parent
        }).then(ch=>{
            if(!ch) return
            newState.member.voice.setChannel(ch)
            const interval = setInterval(() => {
                if(ch.deleted == true){
                    clearInterval(interval)
                    return;
                }
                if(ch.members.size == 0){
                    ch.delete()
                    console.log("채널 삭제됨")
                    return;
                }
            }, 1000);
        })
    }
})


client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.on('messageCreate',message=>{
    if(message.content == "!" + "체스"){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'chess').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

client.on('messageCreate',message=>{
    if(message.content == "!" + "낚시"){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'fishing').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

client.on('messageCreate',message=>{
    if(message.content == "!" + `마피아`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

client.on('messageCreate',message=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})

const convertEmoji = (who) => {
    if(who === "가위"){
      return "🤘";
    }
    else if(who === "바위"){
      return "👊";
    }
    else if(who === "보"){
      return "✋";
    }
  }
  
client.on('message', msg => {  
    if(msg.content === "가위" || msg.content === "바위" || msg.content === "보") {
      const human = msg.content;
      const list = ["가위", "바위", "보"];
      const random = Math.floor(Math.random() * 3);
      const bot = list[random];
      let winner = "";
  
      if(human === bot) {
        winner = "비김";
      }
      else {
        human === "가위" ? (winner = bot === "바위" ? "봇" : "인간") : "";
        human === "바위" ? (winner = bot === "보" ? "봇" : "인간") : "";
        human === "보" ? (winner = bot === "가위" ? "봇" : "인간") : "";
      }
  
      const result =
  `
  사람 : ${convertEmoji(human)} vs 봇 : ${convertEmoji(bot)}
  ${winner === "비김" ? "비겼습니다 !" : winner + "의 승리다"}
  `
      msg.reply(result);
    }
  
});

var restapikey = "87f01a80d6917c6fe81d0e25bab27dd7";

client.on('message', msg => {
	function translate(str) {
		axios
			.get(
				'https://dapi.kakao.com/v2/translation/translate?src_lang=kr&target_lang=en',
				{
					params: {
						query: str
					},
					headers: {
						Authorization: `KakaoAK ${restapikey}`
					}
				}
			)
			.then(function(response) {
				msg.reply(response.data.translated_text[0][0]);
			})
			.catch(function(error) {
				msg.reply('번역 실패');
			});
	}

	if (msg.content.startsWith('!번역')) {
		const a = msg.content.split(' ')[1];
		if (a) {
			translate(a);
		} else {
			msg.reply('번역할 글을 넣어주세요');
		}
	}
});

client.on('messageCreate', async message => {
    let blacklisted = ['https://discord.gg', 'discord.gg/'];
    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
            foundInText = true;
    }

    if (foundInText) { 
        message.delete();
        message.channel.send(`${message.author}ㅣ${message.author.id} 링크 감지로 인해 채팅이 삭제되었습니다.`).then(msg => {
            msg.delete({ timeout: 20000 });
        });
    }
});

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const ms = require('ms');

client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '.';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (cmd === `${prefix}밴`) {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("밴을 할 수 있는 권한이 없습니다.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("차단할 유저을 지정하세요. **.밴 <유저맨션> [사유]**");
        if(user.id === message.author.id) return message.reply("당신은 자신을 밴 할 수 없습니다.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const banmessage = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} 님은 밴 되었어요. 사유 : **${reason != "" ? reason : "-"}**`);
        message.channel.send({ embeds: [banmessage] });
    }

    if (cmd === `${prefix}킥`) {
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("킥을 할 수 있는 권한이 없습니다.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("추방할 유저를 지정하세요. **.킥 <유저> [사유]**");
        if(user.id === message.author.id) return message.reply("당신은 자신을 추방 할 수 없습니다.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} 님은 추방 되었어요. 사유 : **${reason != "" ? reason : "-"}**`);
        message.channel.send({ embeds: [kickmessage] });
    }
});

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const ms = require('ms');
const { redrawAvatar } = require('noblox.js')

client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '-'//접두사
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (cmd === `${prefix}차단`) {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("밴을 할 수 있는 권한이 없습니다.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("차단할 유저을 지정하세요. **-밴 <유저맨션> [사유]**");
        if(user.id === message.author.id) return message.reply("당신은 자신을 밴 할 수 없습니다.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});

        const banmessage = new MessageEmbed()
        .setColor("RED")
        .setTitle("서버 차단을 완료했어요.")
        .setDescription(`**처벌자 : ${user}\n (${user.tag} / ${user.id})\n\n 담당 관리자 : ${message.author}\n (${message.author.tag} / ${message.author.id}) \n\n사유\n**` + "```" + `${reason != "" ? reason : "-"}` + "```")
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL())
        .setFooter(`• FMPC`, message.author.displayAvatarURL())
        message.channel.send({ embeds: [banmessage] });
    
    }

    if (cmd === `${prefix}추방`) {
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("킥을 할 수 있는 권한이 없습니다.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("추방할 유저를 지정하세요. **-킥 <유저> [사유]**");
        if(user.id === message.author.id) return message.reply("당신은 자신을 추방 할 수 없습니다.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new MessageEmbed()
        .setColor("RED")
        .setTitle("서버 추방을 완료했어요.")
        .setDescription(`**처벌자 : ${user}\n (${user.tag} / ${user.id})\n\n 담당 관리자 : ${message.author}\n (${message.author.tag} / ${message.author.id}) \n\n사유\n**` + "```" + `${reason != "" ? reason : "-"}` + "```")
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL())
        .setFooter(`• FMPC`, message.author.displayAvatarURL())
        message.channel.send({ embeds: [kickmessage] });

    }
});

const { MessageEmbed, Permissions, User } = require('discord.js');

module.exports = {
    name:"패치팀후기",
    execute(message,args){
        const msg = args.join(" ")
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
       const date = new Date()
       const time = Math.round(date.getTime() / 1000)
       const embed = new MessageEmbed() 

       .setTitle("후기 알림")
       .setDescription(`**글 작성자 : ${message.author} \n 대상자 : ${user}\n\n 내용 **` + "```" + `${reason != "" ? reason : "-"}` + "```") 
       .setColor(0x2894C2)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())
        message.channel.send({embeds : [embed]})
    }
}

module.exports = {
    name:"스킨팀후기",
    execute(message,args){
        const msg = args.join(" ")
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
       const date = new Date()
       const time = Math.round(date.getTime() / 1000)
       const embed = new MessageEmbed() 

       .setTitle("후기 알림")
       .setDescription(`**글 작성자 : ${message.author} \n 대상자 : ${user}\n\n 내용 **` + "```" + `${reason != "" ? reason : "-"}` + "```") 
       .setColor(0x2894C2)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())
        message.channel.send({embeds : [embed]})
    }
}

client.login(token)