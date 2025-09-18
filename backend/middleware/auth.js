const jwt = require("jsonwebtoken");
const { SLOTADMIN } = require("../modal/admin.modal");
// const {default:mongoose} = require("mongoose")

const UserVerification = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send({
      statuscode: 400,
      message: "Please Login First!!!",
    });
  }
  const userId = jwt.verify(token, "slotadmin");

  if (!userId) {
    return res.send({
      message: "User is not valid !!!",
      statuscode: 400,
    });
  } else {
    req.userId = userId?.userId;
    console.log(req.userId, "..................");

    next();
  }
};

module.exports = { UserVerification,  };
