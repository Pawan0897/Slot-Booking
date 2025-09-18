const express = require("express");
const { UserAddSlot, AvailableSlot, userBookedSlot } = require("../controller/userslot.controller");
const { UserVerification } = require("../middleware/auth");
const { UserLogout } = require("../controller/admin.controller");

const router = express.Router();

router.post("/addslot", UserVerification);

/******************************* User Logout  */
router.post("/logout", UserVerification, UserLogout)

router.get("/availableslot", AvailableSlot)

/************************* Uder sumbit slod */

router.post("/userslotadd", UserAddSlot)

/********************************  uSERaDDED sLOT FETCH */
router.get("/getbookedslot", userBookedSlot)
module.exports = router;