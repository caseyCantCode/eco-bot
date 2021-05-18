const Command = require('../Command');

module.exports = class CommunismCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'communism',
            aliases: [`commie`],
            group: 'meme',
            memberName: 'communism',
            description: 'Make a communism avatar!',
            guarded: true,
            args: [
                {
                    key: 'user',
                    type: "user",
                    prompt: "",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        const attachment = `https://summonjs.xyz/api/communism?image=${user.displayAvatarURL({ format: "png" })}`
        msg.channel.send({ files: [{ name: "communism.png", attachment }] })
    }
}