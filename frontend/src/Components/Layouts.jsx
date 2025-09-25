import React from 'react'
import { Route, Routes } from 'react-router'
import Admin from '../pages/admin/Admin'
import Login from '../pages/Login'
import AddTime from '../pages/admin/pages/AddTime'
import AddeddSlot from '../pages/admin/pages/AddeddSlot'
import Register from '../pages/Register'
import OTPVerify from '../pages/OTPvarify'
import Index from '../pages/user/Index'
import BookedSlot from '../pages/user/BookedSlot'
import { ProtectingRoute } from '../ProtectedRoute/ProtectingRoute'
import AdminRoute from '../ProtectedRoute/AdminRoute'

function Layouts() {
  return (
    <Routes>
      {/* <Route path='/admin' element={<Login />} /> */}
      {/* /*********************************************************** Admin routes */}

      <Route path="*" element={<ProtectingRoute />} >
        <Route path='admin/*' element={<AdminRoute />} >
        </Route>
      </Route>

      {/* ************************ Signup login routes */}
      <Route path='/login' element={<Login />}></Route>
      <Route path='/otpverify' element={<OTPVerify />}></Route>
      <Route path='/signup' element={<Register />}></Route>
      <Route path='/' element={<Index />}></Route>

    </Routes>
  )
}

export default Layouts