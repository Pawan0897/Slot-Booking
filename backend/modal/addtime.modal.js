const {default:mongoose} = require("mongoose");

const {Schema} = mongoose;

const addtimebyadmin = new Schema({
    SetTime:{
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"admin"
    },
    
})

module.exports.ADDTIME = mongoose.model("addtime",addtimebyadmin)