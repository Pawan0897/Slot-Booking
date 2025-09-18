
import https from "./https"

export const AddTimeByAdmin = async (body, token) => {
    return await https.post("/admin/addtime", body, {
        headers: {
            Authorization: token
        }
    })
}

// **************************************** get time 

export const GetTimeSlot = async (body) => {
    return await https.get("/admin/gettime", body)
}

/*********************************** Add Slot By Admin */

export const SlotAddByAdmin = async (body, token) => {
    return await https.post("/admin/addslot", body, {
        headers: {
            Authorization: token
        }
    })
}

/**************************** Get addedd slot by admin */

export const GettAddeddByAdminSlot = async () => {
    return await https.get("/admin/getaddeddslot")
}


// ************************************* User Signup 
export const AdminRegister = async (body) => {
    return await https.post("/admin/signup", body)
}
/************************************** User Login */

export const AdminLogin = async (body) => {
    return await https.post("/admin/login", body)
}

/************************************* User Logout */

export const LogoutUser = async (token) => {
    return await https.post("/user/logout", {}, {
        headers: {
            Authorization: token
        }
    })
}

/************************************ otp verify */
export const VerifyOTP = async (body) => {
    return await https.post("/admin/otpverify", body)
}

// ******************************* All slot fetched 
export const SlotAvail = async () => {
    return await https.get("/user/availableslot")
}

/************************************  user select the slot  */
export const UserSelctSlot = async (body) => {
    return await https.post("/user/userslotadd", body)
}

/****************************************  User Se */

export const BookedSlot = async (body) => {
    return await https.get("/user/getbookedslot", body)
}