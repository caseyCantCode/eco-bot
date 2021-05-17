const { Schema, model } = require('mongoose')
module.exports = model(`Eco`, Schema({
    GuildID: String,
    UserID: String,
    WorkCooldown: String,
    DailyCooldown: String,
    Coins: Number,
    Bank: { type: Number, default: 0 }
}))