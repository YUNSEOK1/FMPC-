const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name:"공지",
    execute(message,args){
        message.delete()
        message.channel.send({ content: "<@&841620243427754017>" })
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없습니다")
        const msg = args.join(" ")
       const date = new Date()
       const time = Math.round(date.getTime() / 1000)
       const embed = new MessageEmbed() 
       .setAuthor("📢ㆍNOTICE") 
       .setTitle("────────────────────────────\n\n" + msg + "\n\n────────────────────────────")
        .setFooter(`담당 관리자 : ${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(0x2894C2)
        .setTimestamp(new Date())

        message.channel.send({embeds : [embed]})

    }
}