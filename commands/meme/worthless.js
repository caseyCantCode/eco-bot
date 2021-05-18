const Command = require('../Command');

module.exports = class WorthlessCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'worthless',
            group: 'meme',
            format: '<text>',
            memberName: 'worthless',
            description: 'Make a dipper pines worthless meme.',
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
        const attachment = `https://summonjs.xyz/api/worthless?image=${user.displayAvatarURL({ format: "png", size: 4096 })}`
        msg.channel.send({ files: [{ name: "worthless.png", attachment }] })
    }
}