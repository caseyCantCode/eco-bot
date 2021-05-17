const { Schema, model } = require(`mongoose`)
module.exports = model(`guild`, Schema({
    GuildID: String,
    CustomShopToggle: Boolean,
    CustomShopItems: Array
}))