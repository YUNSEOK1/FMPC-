const { MessageEmbed,CommandInteraction } = require('discord.js');
const { get } = require('superagent')


module.exports = {
    name: "고양이",
    /**
     * @param { CommandInteraction } Interaction
     */
    async execute(interaction) {
        const res = await get('https://api.thecatapi.com/v1/images/search')
        const han = new MessageEmbed() 
        .setTitle("고양이 랜덤사진")
        .setImage(res.body[0].url)
  

        
        interaction.reply({ embeds: [han] })
    }}