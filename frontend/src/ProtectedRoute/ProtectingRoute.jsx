"use Client"

import { Navigate, Outlet } from "react-router";
import { useToken } from "../hooks/useToken";


export const ProtectingRoute = () => {
    const token = useToken()
    // const navigate = useNavigate()
    if (token == "") {
        return <Navigate to={"/login"} replace={true} />
    }
    else {
        return <Outlet />
    }
}