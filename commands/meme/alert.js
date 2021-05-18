const Command = require('../Command');

module.exports = class AlertCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'alert',
            group: 'meme',
            format: '<text>',
            memberName: 'alert',
            description: 'Make a fake alert text.',
            guarded: true,
            args: [
                {
                    key: "text",
                    prompt: "What text would you like to display?",
                    type: "string"
                }
            ]
        });
    }
    async run(msg, { text }) {
        const attachment = `https://summonjs.xyz/api/alert?text=${text}`
        msg.channel.send({ files: [{ name: "alert.png", attachment }] })
    }
}