const { Schema, model } = require(`mongoose`)
module.exports = model(`guild`, Schema({
    GuildID: String,
    CustomShopItems: Array
}))