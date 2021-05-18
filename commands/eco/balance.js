const Command = require('../Command');
const db = require('../../models/Bal')
const { formatNumber } = require(`../../functions/util/Util`)

module.exports = class BalanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: [`bal`],
            group: 'eco',
            memberName: 'balance',
            description: 'Checks a user balance.',
            guarded: true,
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want?',
                    type: 'user',
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
                    Coins: 0,
                    BegCooldown: 0,
                    HasFishingPoll: false,
                    HasGun: false
                }).save()
                return msg.reply(`**${user.tag}** has **0** coins in there wallet!`)
            } else if (data) {
                let bBal = data.Bank
                if (!bBal) bBal = 0
                else {
                    bBal = formatNumber(data.Bank)
                }
                msg.reply(`**${user.tag}** has **${formatNumber(data.Coins)}** coins in there wallet!`)
            }
        })
    }
}