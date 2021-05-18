const Command = require('../Command');

module.exports = class WantedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wanted',
            group: 'meme',
            memberName: 'wanted',
            description: 'Make your own wanted meme.',
            guarded: true,
            args: [
                {
                    key: "user",
                    prompt: "",
                    type: "user",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        const attachment = `https://summonjs.xyz/api/wanted?image=${user.avatarURL({ format: "png", size: 4096 })}`
        msg.channel.send({ files: [{ name: "wanted.png", attachment }] })
    }
}