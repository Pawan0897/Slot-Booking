import { useSelector } from "react-redux"

export const useStatus = () =>{
    return useSelector((state) => state?.status || "")
}