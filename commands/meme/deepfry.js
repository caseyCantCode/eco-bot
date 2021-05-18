const Command = require('../Command');

module.exports = class DeepfryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'deepfry',
            group: 'meme',
            memberName: 'deepfry',
            description: 'Deepfry a user idk',
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
        const attachment = `https://summonjs.xyz/api/deepfry?image=${user.avatarURL({ format: "png" })}`
        msg.channel.send({ files: [{ name: "deepfry.png", attachment }] })
    }
}