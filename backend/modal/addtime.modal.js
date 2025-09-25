const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const addtimebyadmin = new Schema({
    SetTime: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "admin"
    },

})



// addtimebyadmin.index({ SetTime: 1 }, { expireAfterSeconds: 60 })
module.exports.ADDTIME = mongoose.model("addtime", addtimebyadmin)