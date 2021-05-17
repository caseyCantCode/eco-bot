const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class WithdrawCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'withdraw',
            aliases: [`with`],
            group: 'eco',
            format: '<amount | all>',
            memberName: 'withdraw',
            description: 'withdraw some money from the bank.',
            guarded: true,
        });
    }
    async run(msg) {
        const args = msg.content.slice(this.client.commandPrefix).trim().split(/ +/g)
        let amount = args[0]
        if (!amount) return msg.reply(`please provide a amount of \`all\``)
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: 0,
                    DailyCooldown: 0,
                    Coins: reward,
                    Bank: 0
                }).save()
                return msg.reply(`you don't have any coins!`)
            }
            else if (data) {
                if (amount === "all") amount = data.Coins
                if (amount > data.Coins) return msg.reply(`you do not have \`${amount}\` in your wallet.`)
                data.Coins += amount
                data.Bank -= amount
                data.save()
                return msg.reply(`withdrawal **${amount}** into your wallet!`)
            }
        })
    }
}