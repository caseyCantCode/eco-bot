const { Schema, model } = require('mongoose')
module.exports = model(`Eco`, Schema({
    GuildID: String,
    UserID: String,
    WorkCooldown: String,
    DailyCooldown: String,
    Coins: Number,
    Items: Array,
    Job: Array,
    BegCooldown: String,
    HasFishingPoll: Boolean,
    HasGun: Boolean,
    Fishes: Array,
    Animals: Array
}))