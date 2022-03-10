module.exports = {
    name:"채팅채널생성",
    execute(message, args){
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("권한이 없습니다")
        const channelname = args.join(" ")
        if(!channelname) return message.reply("채널의 이름을 지정해주세요")
        message.guild.channels.create(channelname,{
            type: 'text',
        })
        .then((ch) =>{ 
            message.channel.send(`채널을 만들었습니다${ch}`)
            ch.setParent('카테로리 ID')
        })
    }
}
