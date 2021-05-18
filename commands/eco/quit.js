const Command = require('../Command');
const db = require(`../../models/Bal`)

module.exports = class QuitCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'quit',
            group: 'eco',
            memberName: 'quit',
            description: 'Quit your job.',
            guarded: true,
        });
    }
    async run(msg) {
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                return msg.reply(`You don't have any economy data.`)
            } else if (!data.Job[0]) return msg.reply(`You don't have a job to quit.`)
            else if (data && data.Job[0]) {
                data.Job.splice(`job`, 1)
                data.Job.splice(`income`, 2)
                data.save()
                return msg.reply(`you quit your job!`)
            }
        })
    }
}