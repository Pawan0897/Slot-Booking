const express = require("express");
const {
  UserLogin,
  UserSignup,
  SlotAddedByAmdin,
  SlotDeletedByAdmin,
  UpdateSlotByAdmin,
  AddTimeByAdmin,
  ShowSlotTime,
  AddSlotByAdmin,
  GetAddedSlot,
  OtpVerify,
} = require("../controller/admin.controller");
const { UserVerification } = require("../middleware/auth");

const router = express.Router();

/*************************************************** */
router.post("/login", UserLogin);
/*************************************************** */
router.post("/signup", UserSignup);
/*************************************************** */
router.post("/verify", UserVerification);
/*************************************************** */
// router.post("/addslot", UserVerification, SlotAddedByAmdin);
// ******************* Delete the slot .................
router.delete("/deleteslot/:id", UserVerification, SlotDeletedByAdmin);
// router.post("/addtime",USerAddTime);.................
router.put("/updateslot", UserVerification, UpdateSlotByAdmin);
// ********** add time ***********************...........
router.post("/addtime", UserVerification, AddTimeByAdmin);
// *********************************************
router.post("/otpverify", OtpVerify)

/************************** Added Slot Time Fetch */
router.get("/gettime", ShowSlotTime)
/************************** Addedd Slot By admin ---- */
router.post("/addslot", UserVerification, AddSlotByAdmin)
/********************** Get admin slot addedd */
router.get("/getaddeddslot", GetAddedSlot)
/********************************8   */

/***************** */

module.exports = router;
