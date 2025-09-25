import React from "react";
import AdminHeader from "../Admin-Header";
import { useQuery } from "@tanstack/react-query";
import { GettAddeddByAdminSlot } from "../../../Request/endpoints";

export default function AddeddSlot() {
    const { data } = useQuery({
        queryKey: ["slotadd"],
        queryFn: () => GettAddeddByAdminSlot(),
    });



    const rawData = data?.data?.data || [];


    //   const allSlots = rawData.flatMap((item) =>
    //     item.slotDate.map((date) => ({
    //       date,
    //       times: item.slotTime || [],
    //     }))
    //   );

    // **************************** used to inner element of slot tdate
    const allslots = [];

    rawData.forEach((item) => {
        item?.slotDate.forEach((date) => {
            allslots.push({
                date, time: item?.slotTime || []



            })
        })
    })

    return (
        <>
            <AdminHeader />
            <div className="container">
                <div className="table mt-4">
                    <table className="border table-bordered table">
                        <thead>
                            <tr>
                                <th>Slot Date</th>
                                <th>Slot Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allslots.map((slot) => (
                                <tr >
                                    <td><p>
                                        {slot.date}
                                    </p>
                                    </td>
                                    <td >
                                        <p className="">
                                            {slot.time.length > 0
                                                ? <button className="text-black font-semibold bg-orange-400 px-2 py-2">{slot.time.join(",       ")}</button>
                                                : "No time slots"}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}