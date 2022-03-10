const { Permissions , MessageEmbed } = require("discord.js")

const permissionsembed = new MessageEmbed()
.setTitle("❌ㆍERROR")
.setDescription(`해당 명령어는 MANAGE_CHANNELS 또는 MANAGE_ROLES 권한이 있어야합니다!`)
.setColor('RED')

module.exports = {
    name: "뮤트",
    async execute(message , args) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return message.reply({embeds : [permissionsembed]})

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!target){
            const targetnull = new MessageEmbed()
            .setTitle("❌ㆍERROR")
            .setDescription(`유저를 맨션해주세요!\n(!뮤트 맨션 OR 유저ID)(사유)`)
            .setColor('RED')

            return message.reply({embeds : [targetnull]})
        }

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "사유 없음"
        
        const muterole = message.channel.guild.roles.cache.find(r => r.name == "뮤트")

        if(!muterole){
            const role = await message.guild.roles.create({ name: "뮤트", reason: `Mute Role`, color: "BLUE" })
            message.guild.channels.cache.forEach(channel => {
                channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false, SPEAK: false, ADD_REACTIONS: false, SEND_TTS_MESSAGES: false, ATTACH_FILES: false })
            })
        }

        target.roles.add(muterole.id).then(() => {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`🔈ㆍMUTE 완료 알림`)
                .setDescription(`**유저 : ${target.user.username}** \n\n**처리자 : ${message.author}** \n\n**사유 : ${reason}**`)
                .setTimestamp()
                .setFooter(`담당 관리자 : ${message.author.tag}`, message.author.displayAvatarURL())
            message.reply({embeds : [embed]})
        })
        
    }
}