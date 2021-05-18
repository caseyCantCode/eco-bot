const Command = require('../Command');
const db = require(`../../models/Bal`)
const jobs = ["taxi", "doctor", "clickbaiter", "coder", "gamer", "webdev", "only-fans-girl", "clock-maker", "uwu", "game-maker"]

module.exports = class ApplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'apply',
            aliases: [`ap`],
            group: 'eco',
            format: '<job>',
            memberName: 'apply',
            description: 'Apply for a job.',
            guarded: true,
            args: [
                {
                    key: "job",
                    prompt: "What job what you would like to apply for?",
                    type: "string"
                }
            ]
        });
    }
    async run(msg, { job }) {
        if (!jobs.includes(job)) return msg.reply(`invalid job\nValid jobs\n\`\`\`${jobs.join(" | ")}\n\`\`\``)
        const income = Math.floor(Math.random() * 2000 + 100)
        await db.findOne({ UserID: msg.author.id }, async (err, data) => {
            if (err) throw err
            if (data) {
                if (!data.Job[0]) {
                    data.Job = [{
                        job,
                        income
                    }]
                    data.save()
                    return msg.reply(`you applied for **${job}**! Your income is now **${income}** coins!`)
                } else {
                    return msg.reply(`you already have a job!`)
                }
            } else if (!data) {
                new db({
                    UserID: msg.author.id,
                    GuildID: msg.guild.id,
                    WorkCooldown: 0,
                    DailyCooldown: 0,
                    Coins: 0,
                    Job: [{
                        job,
                        income
                    }],
                    BegCooldown: 0,
                    HasFishingPoll: false,
                    HasGun: false
                }).save()
                return msg.reply(`you applied for **${job}**! Your income is now **${income}** coins!`)
            }
        })
    }
}