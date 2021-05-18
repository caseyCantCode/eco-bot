const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const db = require(`../../models/Bal`)

module.exports = class leaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: [`top`, `lb`],
            group: 'eco',
            memberName: 'leaderboard',
            description: 'Gets the servers leaderboard.',
            guarded: true,
        });
    }
    async run(msg) {
        const data = await db.find({ GuildID: msg.guild.id })
        if (!data) return msg.reply(`no one here has any coins!`)

        const mapped = data.map((c, i) => `**${i + 1}.** ${msg.guild.members.cache.get(c.UserID).user.tag} | **${c.Coins}$**`)

        if (mapped > 2000) mapped.slice(0, 2000) + "..."

        msg.embed(
            new MessageEmbed()
                .setTitle(`\`${msg.guild.name}\`'s Leaderboard`)
                .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(mapped)
        )
    }
}