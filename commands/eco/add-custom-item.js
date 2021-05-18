const Command = require('../Command');
const db = require(`../../models/Guild`)

module.exports = class AddCustomItemCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add-custom-item',
            aliases: [`aci`, `addcustomcode`],
            group: 'eco',
            memberName: 'add-custom-item',
            description: 'Adds a custom item to the shop.',
            guarded: true,
            args: [
                {
                    key: "item",
                    type: "string",
                    prompt: "Please send the item you wish to add to the shop!"
                },
                {
                    key: "price",
                    type: "integer",
                    prompt: "Please send the item price!",
                    min: 1,
                    max: 10000000
                }
            ]
        });
    }
    async run(msg, { item, price }) {
        await db.findOne({ GuildID: msg.guild.id }, async (err, data) => {
            if (err) throw err
            if (!data) return msg.reply(`the custom shop is not enabled.`)
            else if (data) {
                data.CustomShopItems.push({
                    item,
                    price
                })
                data.save()
                return msg.reply(`added **${item}** and it costs **${price}**!`)
            }
        })
    }
}