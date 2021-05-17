const { connect } = require("mongoose")
const { greenBright } = require("chalk")

module.exports.run = async client => {
    console.log(`${client.user.username} is online in ${client.guilds.cache.size} guilds!`)

    await connect(process.env.mongo, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log(greenBright("Mongoose connected.")))
}