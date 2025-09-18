const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const addslotbyadmin = new Schema({
    slotTime: [
        {
            type: String
        }
    ],
    slotDate: [
        {
            type: String
        }
    ],
    createdBy: {
        type: mongoose.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports.ADDSLOTBYADMIN = mongoose.model("addslotbyadmin", addslotbyadmin)