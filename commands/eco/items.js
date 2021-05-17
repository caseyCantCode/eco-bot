const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const db = require(`../../models/Bal`)

module.exports = class ItemsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'items',
            aliases: [`it`],
            group: 'eco',
            format: '',
            memberName: 'items',
            description: 'Get a users items.',
            guarded: true,
            args: [
                {
                    key: "user",
                    prompt: "What user would you like?",
                    type: "user",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        await db.findOne({ UserID: user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: 0,
                    DailyCooldown: 0,
                    Coins: reward,
                    Bank: 0
                }).save()
                return msg.reply(`that user doesn't have any economy data.`)
            } else if (!data.Items) {
                return msg.reply(`that user doesn't have any items.`)
            } else if (data && data.Items) {
                return msg.embed(
                    new MessageEmbed()
                        .setTitle(`\`${user.tag}\`'s Items`)
                        .setColor("RANDOM")
                        .setDescription(
                            data.Items.map((w, i) =>
                                `**${i + 1}:** ${w.items}`
                            )
                        )
                )
            }
        })
    }
}