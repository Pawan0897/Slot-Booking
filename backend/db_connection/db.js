 const {default:mongoose} = require("mongoose");

 const db_connection = async() => {

    return await mongoose.connect("mongodb://127.0.0.1:27017/slotbooking").then(() => {
        console.log("Batabase Created Suceesully !!!");
        
    }).catch((err) => console.log(err,"Something wrong")
    )
 }
 module.exports = {db_connection}