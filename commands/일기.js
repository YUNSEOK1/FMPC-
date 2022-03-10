const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name:"일기",
    execute(message,args){
        message.channel.send({ content: `${message.author}` })
        const msg = args.join(" ")
       const date = new Date()
       const time = Math.round(date.getTime() / 1000)
       const embed = new MessageEmbed() 
       .setAuthor(`${message.author.tag} 님 의 일기 입니다.`) 
       .setTitle("내용\n" + "```" + msg + "```")
       .setColor(0x2894C2)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())
        message.reply({embeds : [embed]})



    }
}

