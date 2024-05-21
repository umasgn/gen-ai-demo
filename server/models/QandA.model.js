const mongoose = require("mongoose");

const qAndA = new mongoose.Schema({
  text: String,
  embedding: [Number],
});

module.exports = mongoose.model("QandA", qAndA);
