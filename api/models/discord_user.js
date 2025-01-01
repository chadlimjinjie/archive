const mongoose = require('mongoose');

const discordUserSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  username: { type: String, required: true },
});

const DiscordUser = mongoose.model('DiscordUser', discordUserSchema);

module.exports = DiscordUser;