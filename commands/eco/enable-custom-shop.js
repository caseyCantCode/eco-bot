const Command = require('../Command');
const db = require(`../../models/Guild`)

module.exports = class EnableCustomSopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'enable-custom-shop',
            aliases: [`enablecustomshop`],
            group: 'eco',
            memberName: 'enable-custom-shop',
            description: 'Enables the custom shop for your server.',
            guarded: true,
            // userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg) {
        await db.findOne({ GuildID: msg.guild.id }, async (err, data) => {
            if (err) throw err
            if (data) return msg.reply(`the custom shop is already enabled!`)
            else if (!data) {
                new db({
                    GuildID: msg.guild.id
                }).save()
                return msg.reply(`enabled the custom shop for **${msg.guild.name}**!`)
            }
        })
    }
}