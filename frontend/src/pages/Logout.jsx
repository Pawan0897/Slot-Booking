import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { LogoutUser } from '../Request/endpoints'
import { useToken } from '../hooks/useToken'
import { useDispatch } from 'react-redux'
import { AddStatus, AddToken } from '../Redux/Reducer'
import { status } from './status'
import Swal from 'sweetalert2'

export default function Logout() {

  const token = useToken();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /************************************************ */
  const logoutUser = useMutation({
    mutationFn: (token) => LogoutUser(token),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be Logout !!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `${res?.data?.message}`,
              text: `${res?.data?.text}`,
              icon: "success"
            });
            dispatch(AddToken(""))
            dispatch(AddStatus(status.Inactive))
            navigate("/login")
          }
        });
      }
      else {
        Swal.fire({
          text: "please try again ",
          title: "Something Wrong !!",
          icon: "info"
        })
      }
    }
  })
  /************************************************ */
  return (
    <>
      <Link onClick={() => logoutUser.mutate(token)} className={` text-decoration-none bg-gradient-to-r from-orange-500 to-orange-600 rounded   py-2 px-2 text-ambber-50 text-light flex justify-center items-center font-semibold`}>
        Logout
      </Link>
    </>
  )
}
