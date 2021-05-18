const Command = require('../Command');

module.exports = class CrushCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'crush',
            group: 'meme',
            memberName: 'crush',
            description: 'Crush on a user <3',
            guarded: true,
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt: "",
                    default: m => m.author
                }
            ]
        });
    }
    async run(msg, { user }) {
        const attachment = `https://summonjs.xyz/api/crush?image=${user.displayAvatarURL({ format: "png" })}`
        msg.channel.send({ files: [{ name: "crush.png", attachment }] })
    }
}