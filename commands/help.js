const { Client, GatewayIntentBits, Collection, ButtonStyle, ComponentType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });


module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Daje pełną listę komend")
,
async execute(interaction) {
    const { options } = interaction;

        const embed = new EmbedBuilder();
            embed.setColor(0xA4161A)
            embed.setTitle('**Oto Lista Komend!**')
            embed.setAuthor({ name: 'Milijon', iconURL: 'https://i.imgur.com/S7nb2Hk.png' })
            embed.setThumbnail('https://i.imgur.com/S7nb2Hk.png')
            embed.setTimestamp()
            embed.setFooter({ text: 'Miłego korzystania', iconURL: 'https://i.imgur.com/S7nb2Hk.png' });
            embed.setImage('https://i.imgur.com/Ibbb9e8.png')
        // Poprawiamy tworzenie embeda na MessageEmbed
                
                
          embed.addFields(
            {name: `**/pytaj**`, value: `*Zadaje pytanie z gatunku co miał na myśli Marcin, za poprawną odpowiedź dostajesz 1 punkt, nie ma konsekwencji jeżeli odpowiesz błędnie*`}
          )
          embed.addFields(
            {name: `**/hardquest**`, value: `*Zadaje trudne pytanie z wiedzy o gwarze Marcińskiej, za dobrą odpowiedź dostaniesz 10 punktów, lecz za złą stracisz 5 punktów!*`}
          )
          embed.addFields(
            {name: `**/top**`, value: `*Pokazuje listę top 10 graczy*`}
          )
          embed.addFields(
            {name: `**/solo**`, value: `*Pokazuje to ile punktów aktualnie posiadasz*`}
          )
          embed.addFields(
            {name: `**/sugestia**`, value: `*Wysyłasz swoją sugestię pytania wraz z prawidłową odpowiedzią do Administracji, w przyszłości być może twoje pytanie zostanie dodane! - komenda działa wyłącznie na serwerze developerskim bota*`}
          )
            
        interaction.reply({ embeds: [embed] });
        

    
  },
}