const Command = require('../Command');
const db = require(`../../models/Guild`)

module.exports = class DisableCustomSopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'disable-custom-shop',
            aliases: [`disablecustomshop`],
            group: 'eco',
            memberName: 'disable-custom-shop',
            description: 'Disables the custom shop for your server.',
            guarded: true,
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg) {
        await db.findOne({ GuildID: msg.guild.id }, async (err, data) => {
            if (err) throw err
            if (!data) return msg.reply(`the custom shop is already disabled.`)
            else if (data) {
                await db.findOneAndDelete({ GuildID: msg.guild.id })
                return msg.reply(`disabled the custom shop for **${msg.guild.name}**!`)
            }
        })
    }
}