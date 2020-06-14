const mongoose = require("mongoose");

const TimeLineSchema = new mongoose.Schema({
  year: {
    type: String,
  },
  events: {
    type: Array,
  },
});

module.exports = mongoose.model("timelines", TimeLineSchema);
