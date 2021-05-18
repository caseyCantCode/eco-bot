const Command = require('../Command');

module.exports = class LisaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lisa',
            group: 'meme',
            format: '<text>',
            memberName: 'lisa',
            description: 'Make a lisa meme.',
            guarded: true,
            args: [
                {
                    key: "text",
                    prompt: "What text do you want to display?",
                    type: "string"
                }
            ]
        });
    }
    async run(msg, { text }) {
        const attachment = `https://summonjs.xyz/api/lisa?text=${text}`
        msg.channel.send({ files: [{ name: "lisa.png", attachment }] })
    }
}