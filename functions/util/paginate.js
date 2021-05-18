async function paginate(bot, message, pages) {
    let index = 0;
    if (!pages) return;
    let m =
        await message.embed(pages[index]);
    function up() {
        m.edit(pages[index]);
    }
    pages.length > 1 ? ['⏮', '◀️', '⏹', '▶️', '⏭'].map(v => m.react(v)) : null;
    const collector = m.createReactionCollector(
        (r, u) => {
            if (u.id === message.author.id) return true;
            else if (u.id !== bot.user.id) {
                r.users.remove(u.id).catch(() => { });
                return false;
            }
        },
        { time: 30000 }
    );
    collector.on('collect', (r, u) => {
        r.users.remove(u.id).catch(() => { });
        switch (r.emoji.name) {
            case '▶️':
                index = index == pages.length - 1 ? index : index + 1;
                up();
                break;
            case '◀️':
                index = index ? index - 1 : index;
                up();
                break;
            case '⏮':
                index = 0;
                up();
                break;
            case '⏭':
                index = pages.length - 1;
                up();
                break;
            case '⏹':
                collector.stop()
                for (let reaction of r.message.reactions.cache.array()) {
                    reaction.users.remove(bot.id);
                }
                return;
                break;
        }
    });
    collector.on('end', () => m.reactions.removeAll().catch(() => { }));
};
module.exports = { paginate }