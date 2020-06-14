const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brandName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Array,
  },
  additionalInfo: {
    type: String,
  },
  city: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contacts", ContactSchema);
