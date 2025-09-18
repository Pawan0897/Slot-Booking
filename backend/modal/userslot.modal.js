const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const UserSlot = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  },
  slotTime: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  
  purpose: {
    type: String,
  },
});
module.exports.USERSLOT = mongoose.model("userbookslot", UserSlot);
