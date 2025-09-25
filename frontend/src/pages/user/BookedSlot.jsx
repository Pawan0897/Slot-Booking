import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { SlotBookedByUser } from '../../Request/endpoints'
import AdminHeader from '../admin/Admin-Header';

export default function BookedSlot() {
    const { data } = useQuery({
        queryKey: ['bookedslot'],
        queryFn: () => SlotBookedByUser()
    })
    console.log(data);

    const UserSlot = data?.data?.data;

    return (
        <>
            <AdminHeader />

            <div className="container mt-5  flex  items-center justify-center">
                <div className="table  table-bordered text-center ">
                    <h1 className='font-bold text-8xl text-black mt-3 pb-4'>Booked Slot</h1>
                    <table className='w-full bordered table table-bordered'>
                        <thead>
                            <th>User</th>
                            <th>Slot Date</th>
                            <th>Slot Time</th>
                            <th>Email</th>
                            <th>Purpose</th>

                        </thead>
                        {/* ******************** body */}
                        <tbody className=''>
                            {
                                UserSlot?.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='font-semibold capitalize'>{item?.name}</td>
                                                <td className='font-semibold capitalize'><button className='bg-black py-1 px-2 text-amber-50 rounded font-semibold'>{item?.slotTime?.date} </button>  </td>
                                                <td>
                                                    <button className='bg-black py-1 px-2 text-amber-50 rounded font-semibold'>{item?.slotTime?.time} </button>

                                                </td>
                                                <td className='font-semibold '>{item?.email}</td>
                                                <td className='font-semibold capitalize'>{item?.purpose}</td>
                                            </tr>

                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
