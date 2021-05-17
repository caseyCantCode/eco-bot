const Command = require('../Command');
const db = require('../../models/Bal')

module.exports = class BalanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: [`bal`],
            group: 'eco',
            format: '',
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
                return msg.reply(`**${user.tag}** has **0** coins!`)
            } else if (data) {
                msg.reply(`**${user.tag}** has **${data.Coins}** coins!`)
            }
        })
    }
}