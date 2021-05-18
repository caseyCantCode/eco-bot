const Command = require('../Command');

module.exports = class GayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gay',
            group: 'meme',
            memberName: 'gay',
            description: 'Make your avatar rainbow/gay!',
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
        const attachment = `https://summonjs.xyz/api/gay?image=${user.avatarURL({ format: "png" })}`
        msg.channel.send({ files: [{ name: "gay.png", attachment }] })
    }
}