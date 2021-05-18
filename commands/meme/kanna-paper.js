const Command = require('../Command');

module.exports = class KannaPaperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kanna-paper',
            aliases: [`kanna`, `kannapaper`],
            group: 'meme',
            format: '<text>',
            memberName: 'kanna-paper',
            description: 'Make your own kanna-paper meme.',
            guarded: true,
            args: [
                {
                    key: "text",
                    type: "string",
                    prompt: "What text do you want to display?"
                }
            ]
        });
    }
    async run(msg, { text }) {
        const attachment = `https://summonjs.xyz/api/kanna-paper?text=${text}`
        msg.channel.send({ files: [{ name: "kanna-paper.png", attachment }] })
    }
}