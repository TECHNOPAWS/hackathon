const lb = new mongoose.Schema({
  guild: String,
  userid: String,
  wins: Number,
  matches: Number,
  loses: Number,
})

module.exports = new mongoose.model('leaderBoard', lb)