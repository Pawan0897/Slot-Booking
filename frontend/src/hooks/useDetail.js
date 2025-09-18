import { useSelector } from "react-redux"

export const useDetail = () => {
    return useSelector((state) => state?.isActive || "")
}