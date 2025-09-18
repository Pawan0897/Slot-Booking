const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const avaliableslot = new Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  isBooked:{
    type:Boolean,
    default:false
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "admin",
  },
});
module.exports.AVALIABLESLOT = mongoose.model("avaliableslot", avaliableslot);
