const Command = require('../Command');

module.exports = class SourceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'source',
            group: 'info',
            memberName: 'source',
            description: 'Get the bots source code!',
            guarded: true,
        });
    }
    async run(msg) {
        msg.reply(`https://github.com/caseyCantCode/eco-bot\n__**please make sure to read the README.md**__`)
    }
}