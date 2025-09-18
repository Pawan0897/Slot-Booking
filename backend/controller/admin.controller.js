const { SLOTADMIN } = require("../modal/admin.modal");
const bcrypt = require("bcrypt");
const { AVALIABLESLOT } = require("../modal/avaliableslot.modal");
const jwt = require("jsonwebtoken");
const { ADDTIME } = require("../modal/addtime.modal");
const { ADDSLOTBYADMIN } = require("../modal/addslotbyadmin.modal");
const OTPverification = require("../middleware/OTPverification");
/*************************** User Admin .................. */
const UserSignup = async (req, res) => {
  const { Name, Number, Email, Password } = req.body;

  const AlreadyExist = await SLOTADMIN.find();

  if (AlreadyExist.length == 10) {
    return res.send({
      message: "Admin Not Allowed!!",
      text: "Admin is Already Registered !!!",

      statuscode: 400,
    });
  } else {
    const email = Email.toLowerCase();
    const hashPassword = await bcrypt.hash(Password, 10);
    console.log(hashPassword, "..................................");

    const saveData = new SLOTADMIN({
      Name: Name,
      Email: email,
      Number: Number,
      Password: hashPassword,
    });
    await saveData.save();

    OTPverification(Email, res)
  }
};

/********************** USER Login ...................... */
const UserLogin = async (req, res) => {
  const { Email, Password } = req.body;
  const emailExist = await SLOTADMIN.findOne({ Email: Email });
  if (!emailExist) {
    return res.send({
      statuscode: 400,
      message: "Email is not Valid!!!",
    });
  } else if (!(await bcrypt.compare(Password, emailExist?.Password))
  ) {
    return res.send({
      statuscode: 400,
      message: "Password is not exist",
    });
  } else {
    const token = jwt.sign({ userId: emailExist?._id }, "slotadmin");
    emailExist.token = token;
    emailExist.isActive = true;
    emailExist.status = "active"
    await emailExist.save();

    return res.send({
      statuscode: 200,
      message: "Logined Successfully !!!",
      data: emailExist,
    });
  }
};


/************************** Logout ***************************** */

const UserLogout = async (req, res) => {
  const userId = req.userId;
  const userExist = await SLOTADMIN.findOne({ _id: userId });
  if (userExist) {
    userExist.status = "inactive",
      userExist.token = "",
      await userExist.save()
    return res.send({
      statuscode: 200,
      message: "Logout Successfully !!!",
      text: "You are logout Successfullt !!!",

    })
  }
  else {
    return res.send({
      statuscode: 400,
      message: "Something was wrong !!!",
      text: "something was wrong or sequrity issue !!"
    })
  }

}

/************************************** bookingSlot Addedd by Admin  */

const SlotAddedByAmdin = async (req, res) => {
  const { date, time } = req.body;
  const userId = req.userId;

  const userExist = await SLOTADMIN.findOne({ _id: userId });
  const AlreadyExist = await AVALIABLESLOT.findOne({ date: date, time: time });

  if (!userExist) {
    return res.send({
      message: "You are Not Valid user!!",
      statucode: 400,
    });
  } else if (AlreadyExist) {
    return res.send({
      message: "This Slot Already Addedd!!",
      statuscode: 400,
    });
  } else {
    const data = new AVALIABLESLOT({
      date: date,
      time: time,
      createdBy: userId,
    });

    const saveData = await data.save();
    return res.send({
      statuscode: 200,
      message: "Slot Addedd Successfully!!",
      data: saveData,
    });
  }
};

// *************************************** Deleted Slot by admin.......
const SlotDeletedByAdmin = async (req, res) => {
  const { id } = req.params;
  const dataexist = await SLOTADMIN.findById({ _id: id });
  if (dataexist) {
    const deldata = await SLOTADMIN.findByIdAndDelete({ _id: id });
    if (deldata) {
      return res.send({
        statuscode: 200,
        message: "Deleted successfullty !!",
      });
    } else {
      return res.send({
        statuscode: 400,
        message: "Something Wrong!!!!",
      });
    }
  } else {
    return res.send({
      statuscode: 400,
      message: "Slot not foundecde",
    });
  }
};
// ******************************* update

const UpdateSlotByAdmin = async (req, res) => {
  const { id } = req.params;
  const userexist = await SLOTADMIN.findById({ _id: id });

  if (!userexist) {
    return res.send({
      statucode: 400,
      message: "user Not valide",
    });
  } else {
    const data = await SLOTADMIN.findByIdAndUpdate(
      { _id: id },
      { $set: { date, time } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: "update Successfu;;y",
      data: data
    });
  }
};


/**************************** Add Time By Admin */

const AddTimeByAdmin = async (req, res) => {

  try {
    const { SetTime } = req.body;
    const userId = req.userId;
    const userExist = await SLOTADMIN.findOne({ _id: userId })
    /************************************** Start */
    if (userExist) {
      const timeExist = await ADDTIME.findOne({ SetTime: SetTime });
      if (timeExist) {
        return res.send({
          statuscode: 400,
          message: "Time is Already Addedd !!"
        })
      }
      else {
        const saveData = new ADDTIME({
          SetTime: SetTime,
          createdBy: userId
        })
        const data = await saveData.save();
        return res.send({
          message: "Time Addedd Successffully!!",
          data: data,
          statuscode: 200
        })
      }
    }
    else {
      return res.send({
        statuscode: 400,
        message: "Something is wrong !!",

      })
    }

  } catch (error) {
    return res.send({
      statuscode: 500,
      message: `${error} somthing wrong`
    })

  }




}

// ********************************* Show the Time get 

const ShowSlotTime = async (req, res) => {
  const data = await ADDTIME.find()
  if (data.length == 0) {
    return res.status(400).send({
      message: "No Time !!!",
      data: data
    })
  }
  else {
    return res.send({
      statuscode: 200,
      message: "Time book!!!",
      data: data
    })
  }
}

/********************************** Addd slot by admin  */
const AddSlotByAdmin = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId, "pkpkpkpkpkpk");

    const userExist = await SLOTADMIN.findOne({ _id: userId })
    const { slotTime, slotDate } = req.body;
    const data = await ADDSLOTBYADMIN.findOne({ slotDate: slotDate, slotTime: slotTime });
    if (userExist) {
      if (data) {
        return res.send({
          statuscode: 400,
          message: "Alredy added this date on slot!!",
          text: "This Slot is Already added your slot list!!",
          data: data
        })
      }
      else if (slotDate == "") {
        return res.send({
          statuscode: 400,
          message: "Date Slot is Empty!!",
          text: "Please Select Date for Add Slot"

        })
      }
      else if (slotTime == "") {
        return res.send({
          statuscode: 400,
          message: "Time Slot is Empty!!",
          text: "Please Select Time  for Add Slot"

        })
      }
      else {
        const AddSlot = new ADDSLOTBYADMIN({
          slotDate: slotDate,
          slotTime: slotTime,
          createdBy: userId
        })
        await AddSlot.save()
        return res.send({
          statuscode: 200,
          message: "Slot addedd Successfully!!!",
          text: "Your slot will be successfully addedd!!!",
          data: AddSlot
        })
      }
    }
    else {
      return res.send({
        statuscode: 400,
        message: "user is not find !!",
        text: "login now you are not login !!!",

      })
    }
  }
  catch (err) {
    return res.send({
      statuscode: 500,
      message: `${err} Something is wrong !!!`
    })
  }

}
/**************************************** get SLot  date...*/
const GetAddedSlot = async (req, res) => {
  const data = await ADDSLOTBYADMIN.find()

  if (data == 0) {
    return res.send({
      statuscode: 400,
      message: "No Slot Available",
      data: data
    })
  }
  else {
    return res.send({
      message: "Slot",
      statuscode: 200,
      data: data
    })
  }
}

/******************************** OTP verify  */
const OtpVerify = async (req, res) => {
  const { otp } = req.body;
  console.log(otp);

  const isValidUser = await SLOTADMIN.findOne({ OTP: otp });
  console.log(isValidUser);

  if (isValidUser) {
    isValidUser.isValid = true;
    isValidUser.OTP = ""
    await isValidUser.save()
    return res.send({
      statuscode: 200,
      message: "Successfully Login!",
      text: "You Are Loged In !!",

    })
  }
  else {
    return res.send({
      statuscode: 200,
      message: "OTP is Not Valid !",
      text: "Please Fill correct OTP !!",

    })
  }

}

module.exports = {
  UserLogin,
  UserSignup,
  ShowSlotTime,
  SlotAddedByAmdin,
  UpdateSlotByAdmin,
  SlotDeletedByAdmin,
  AddTimeByAdmin,
  AddSlotByAdmin,
  GetAddedSlot,
  UserLogout,
  OtpVerify,
  
};
