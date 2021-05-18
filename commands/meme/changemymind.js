const Command = require('../Command');

module.exports = class ReverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changemymind',
            group: 'meme',
            format: "<text>",
            aliases: [`cmm`],
            memberName: 'changemymind',
            description: 'Make a change my mind meme.',
            guarded: true,
            args: [
                {
                    key: "text",
                    prompt: "What text do you want?",
                    type: "string",
                }
            ]
        });
    }
    async run(msg, { text }) {
        const attachment = `https://summonjs.xyz/api/changemymind?text=${text}`
        msg.channel.send({ files: [{ name: "changemymind.png", attachment }] })
    }
}