import React from 'react'
import { Link, useLocation } from 'react-router'
import "../../../src/style.css"
import { useDetail } from '../../hooks/useDetail'
import Logout from '../Logout'
import { useStatus } from '../../hooks/useStatus'
import { status } from '../status'
export default function AdminHeader() {
  const location = useLocation()
  // console.log(location, "..........");
  const NavActive = {
    active: " text-gray-700",
    noactive: "text-black"
  }
  const isactive = useDetail()
  console.log(isactive, "pk.......");
  const userstatus = useStatus()
  return (
    <>
      <div className="h-13 px-3 navbar flex items-center  justify-between  capitalize rounded w-full bg-white backdrop-blur-sm  shadow-lg">
        <div className="logo">
          <h3>Admin.</h3>

        </div>
        <div className="link-items ">
          <ul className='flex gap-10 me-10 mb-2 cursor-pointer items-center   '>
            <li>home</li>
            <li><Link to={"/admin"} className={`no-underline text-decoration-none  ${location.pathname == "/admin" ? " active-link border-b-2" : NavActive?.noactive}`}>Add Slot</Link></li>
            <li><Link to={"/addtime"} className={`no-underline text-decoration-none  ${location.pathname == "/addtime" ? " active-link border-b-2" : NavActive?.noactive}`}>Add Time</Link></li>
            <li>Booked Slot</li>
            <li><Link
              to={"/addeddslots"}
              className={`no-underline text-decoration-none ${location.pathname === "/addeddslots"
                ? "active-link border-b-2"
                : NavActive.noactive
                }`}
            >
              Slot user
            </Link> </li>
            <li className=''>
              {
                userstatus == status?.Inactive ?
                  <Link to={"/login"} className={`no-underline text-decoration-none bg-gradient-to-r from-orange-500 to-orange-600 rounded   py-1 px-3 text-ambber-50 text-light flex justify-center items-center font-semibold`}>
                    Login
                  </Link>
                  : <Logout />
              }

            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
