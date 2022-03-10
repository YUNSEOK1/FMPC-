const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "내정보",
    execute(message) {
        const dddd = new MessageEmbed()
            .setTitle(`${message.member.user.tag} 님 의 정보`)

            .setThumbnail(message.member.user.displayAvatarURL())

            .addField(`${message.author.tag} 님 의 아이디`, `${message.member.user.id}`)

            .addField(`${message.author.tag} 님 의 생일 🍰`, `${message.member.user.createdAt.getFullYear()}년 ${message.member.user.createdAt.getMonth() + 1}월 ${message.member.user.createdAt.getDate()}일 ${message.member.user.createdAt.getHours()}시 ${message.member.user.createdAt.getMinutes()}분`)

            .addField("서버 가입 날짜", `${new Date(message.member.joinedAt).toLocaleDateString()}`)

            .addField(`${message.author.tag} 님이 가진 역할 수`, `${message.member.roles.cache.size - 1}`)

        message.channel.send({ embeds: [dddd] })
    }
}