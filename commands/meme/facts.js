const Command = require('../Command');

module.exports = class FactsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'facts',
            group: 'meme',
            format: '<text>',
            memberName: 'facts',
            description: 'Make your own fact!',
            guarded: true,
            args: [
                {
                    key: "text",
                    type: "string",
                    prompt: "What fact do you want?",
                }
            ]
        });
    }
    async run(msg, { text }) {
        const attachment = `https://summonjs.xyz/api/facts?text=${text}`
        msg.channel.send({ files: [{ name: "facts.png", attachment }] })
    }
}