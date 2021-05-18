const Command = require('../Command');
const db = require(`../../models/Bal`)
const ms = require(`parse-ms`)

module.exports = class WorkCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'work',
            aliases: ["w"],
            group: 'eco',
            memberName: 'work',
            description: 'Work your ass off.',
            guarded: true,
        });
    }
    async run(msg) {
        const timeout = 1.8e+6

        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`please apply for a job!\nTo do so \`<prefix> apply\``)
            } else if (data) {
                if (timeout - (Date.now() - data.WorkCooldown) > 0) {
                    let time = ms(timeout - (Date.now() - data.WorkCooldown))
                    return msg.reply(`please wait **${time.hours}**H **${time.minutes}**M **${time.seconds}**S`)
                } else {
                    if (!data.Job[0]) return msg.reply(`please apply for a job!\nTo do so \`<prefix> apply\``)
                    data.Coins += data.Job[0].income
                    data.WorkCooldown = Date.now()
                    data.save()
                    return msg.reply(`worked there ass off and earned **${data.Job[0].income}**!`)
                }
            }
        })
    }
}