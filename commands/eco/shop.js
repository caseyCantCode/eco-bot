const Command = require('../Command');
const { MessageEmbed } = require('discord.js')
const db = require('../../models/Guild')

module.exports = class ShopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shop',
            aliases: [`sh`],
            group: 'eco',
            format: '',
            memberName: 'shop',
            description: 'View the shop.',
            guarded: true,
        });
    }
    async run(msg) {
        await db.findOne({ GuildID: msg.guild.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`no custom items found.`)
            } else if (data) {
                return msg.embed(
                    new MessageEmbed()
                        .setAuthor(`Shop`, msg.guild.iconURL({ dynamic: true }))
                        .setColor("RANDOM")
                        .addField(`Custom Items`,
                            data.CustomShopItems.map(w =>
                                `**${w.item}**\nPrice: ${w.price}`
                            ).join("\n")
                        )
                )
            }
        })
    }
}