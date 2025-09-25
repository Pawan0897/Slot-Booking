const SendMail = require("../middleware/SendMail");
const { ADDSLOTBYADMIN } = require("../modal/addslotbyadmin.modal");
const { USERSLOT } = require("../modal/userslot.modal");


const UserAddSlot = async (req, res) => {
    const { date, time, name, email, userDocument, purpose } = req.body;
    const AlreadyBooked = await USERSLOT.findOne({ email: email });

    if (AlreadyBooked) {
        return res.send({
            statuscode: 400,
            message: "You Are Already Booked !!!",
            data: AlreadyBooked
        })
    }
    else {
        const SaveData = new USERSLOT({
            name,
            email,
            userDocument,
            purpose,
            slotTime: {
                date: date,
                time: time
            }
        })
        const body = {
            time: time,
            date: date,
            mail: email,
            data: SaveData,

        }
        await SendMail(body, res)
        // return res.send({
        //     message: "Thanks For Booking!!!",
        //     data: data,
        //     statuscode: 200
        // })
    }
}
/**************************************************  */
// ***************************************
const AvailableSlot = async (req, res) => {
    const AvailSlot = await ADDSLOTBYADMIN.find();
    console.log(AvailSlot, ".....");

    if (AvailSlot == 0) {
        return res.send({
            statuscode: 400,
            message: "No Slot Available !!!",
        })
    }
    else {
        return res.send({
            statuscode: 200,
            message: "Booking Now!!",
            data: AvailSlot
        })
    }
}
/******************************* Userbokkkde Slot */
const userBookedSlot = async (req, res) => {
    const bookedSlot = await USERSLOT.find();

    if (bookedSlot.length == 0) {
        return res.send({
            statuscode: 400,
            message: "no Slot Available",

        })
    }
    else {
        return res.send({
            statuscode: 200,
            message: "Booked Slot!!!",
            data: bookedSlot

        })

    }
}

// ********************************************* Fetch All 

module.exports = { UserAddSlot, AvailableSlot, userBookedSlot }