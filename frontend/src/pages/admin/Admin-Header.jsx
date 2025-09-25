import React from 'react'
import { Link, useLocation } from 'react-router'
import "../../../src/style.css"
import { useDetail } from '../../hooks/useDetail'
import Logout from '../Logout'
import { useStatus } from '../../hooks/useStatus'
import { status } from '../status'
import { useToken } from '../../hooks/useToken'
export default function AdminHeader() {
  const location = useLocation()
  const token = useToken()

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
            {/* ********************* */}

            {/* ********************* Condition start */}

            {
              token == "" ?
                (
                  <>
                    <li className='font-semibold'>home</li>
                  </>
                ) :
                (
                  <>
                    {/* ********************* */}
                    <li><Link to={"/admin"} className={`no-underline text-decoration-none  font-semibold ${location.pathname == "/admin" ? " active-link border-b-2" : NavActive?.noactive}`}>Add Slot</Link></li>
                    {/* ********************* */}
                    <li><Link to={"/admin/addtime"} className={`no-underline text-decoration-none  font-semibold ${location.pathname == "/addtime" ? " active-link border-b-2" : NavActive?.noactive}`}>Add Time</Link></li>
                    {/* ********************* */}
                    <li><Link to={"/admin/bookedslot"} className={`no-underline text-decoration-none font-semibold ${location.pathname == "/bookedslot" ? " active-link border-b-2" : NavActive?.noactive}`}>Booked Slot</Link></li>
                    {/* ********************* */}
                    <li><Link
                      to={"/admin/addeddslots"}
                      className={`no-underline text-decoration-none font-semibold ${location.pathname === "/addeddslots"
                        ? "active-link border-b-2"
                        : NavActive.noactive
                        }`}
                    >
                      Slot user
                    </Link></li>
                    {/* ********************* */}
                  </>
                )
            }

            {/* ********************* condition End..... */}



            <li className=''>
              {
                userstatus == status?.Inactive || token == "" ?
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
