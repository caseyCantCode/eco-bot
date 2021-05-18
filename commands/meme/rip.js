const Command = require('../Command');

module.exports = class WantedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rip',
            group: 'meme',
            memberName: 'rip',
            description: 'Make your own rip meme.',
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
        const attachment = `https://summonjs.xyz/api/rip?image=${user.avatarURL({ format: "png", size: 4096 })}`
        msg.channel.send({ files: [{ name: "rip.png", attachment }] })
    }
}