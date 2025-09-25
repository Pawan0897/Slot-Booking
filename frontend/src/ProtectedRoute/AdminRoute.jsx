import React from 'react'
import { Route, Routes } from 'react-router'
import Admin from '../pages/admin/Admin'
import AddTime from '../pages/admin/pages/AddTime'
import AddeddSlot from '../pages/admin/pages/AddeddSlot'
import BookedSlot from '../pages/user/BookedSlot'

export default function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Admin />} />
                <Route path='/addtime' element={<AddTime />} />
                {/* <Route path="login" element={<Login} */}
                {/* <Route path="/singup"></Route> */}
                <Route path='/addeddslots' element={<AddeddSlot />}></Route>
                <Route path='/bookedslot' element={<BookedSlot />} ></Route>
            </Routes>

        </>
    )
}
