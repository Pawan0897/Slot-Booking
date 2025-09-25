const { default: mongoose } = require("mongoose")

const { Schema } = mongoose;

const slotadmin = new Schema({

    Name: {
        type: String
    },
    Number: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    token: {
        type: String,

    },
    isActive: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: String,
    },
    isValid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "inactive", "deleted"],
        default: "inactive"

    },
    tokenExpiry: {
        type: Date,
        index: { expireAfterSeconds: 60 }
    },
})
module.exports.SLOTADMIN = mongoose.model("slotadmin", slotadmin);