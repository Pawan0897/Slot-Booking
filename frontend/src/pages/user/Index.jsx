import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookedSlot, SlotAvail, UserSelctSlot } from "../../Request/endpoints";
import moment from "moment";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2"
export default function Index() {
    // *************************************
    const [TimeSlot, setTimeSlot] = useState([]);
    const [selectDate, setselectDate] = useState("");
    const [openBox, SetopenBox] = useState(true);

    // :::::::: fromik values

    /*********************** click on time color change  */
    const [clickTime, setclickTime] = useState("");
    const { data } = useQuery({
        queryKey: ["availslot"],
        queryFn: () => SlotAvail(),
    });
    /********************** for Date data drom addedd slot */
    const SlotData = data?.data?.data?.map((item) => item?.slotDate).flat() || [];
    /********************** for Time data drom addedd slot */
    const SlotTime = data?.data?.data?.map((item) => item?.slotTime).flat() || [];

    const sloted = data?.data?.data || [];
    // const createdby = data?.data?.data?.map((item) => item?.createdBy)

    const slotBooked = useQuery({
        queryKey: ["bookedslot"],
        queryFn: () => BookedSlot(),
    });

    // ********************************************** TTime

    const TimeShow = (dateDate) => {
        sloted.forEach((item) => {
            item?.slotDate.forEach((date) => {
                if (dateDate == date) {
                    setTimeSlot(item?.slotTime);
                    console.log(item?.slotTime, "pkpkpk");
                }
            });
        });
    };

    // ****************************************************
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            slotTime: {
                date: selectDate,
                time: clickTime,
            },
            purpose: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            number: yup.string().required(),
            purpose: yup.string().required(),
        }),
        onSubmit: (values) => {
            const finalValues = {
                ...values,
                date: selectDate,
                time: clickTime,
            };

            AddSlot.mutate(finalValues);
        },
    });

    const AddSlot = useMutation({
        mutationFn: (value) => UserSelctSlot(value),
        onSuccess: (res) => {
            if (res?.data?.statuscode == 200) {
                Swal.fire({
                    title: res?.data?.message
                })
                console.log(res?.data, "qwqwqwwwwwwwwwwwwwwwwwwwwwwwwwwww");
            }

        },
    });
    //  ****************************** Get the booked slot

    //  ************************************************************************************** RND
    const resvSlot = slotBooked?.data?.data?.data.map((item) => item) || [];
    console.log(resvSlot, ".l.l.l...lllll....", resvSlot);
    console.log(".........slotdata.......", sloted);

    const isbook = resvSlot.flatMap((b) => {
        const st = b?.slotTime;
        if (!st) return [];

        const dateField = st.date;
        const timeField = st.time;
        if (!timeField || !dateField) return [];

        const dates = Array.isArray(dateField) ? dateField : [dateField];
        const matches = dates.some((d) => moment(d).format("YYYY-MM-DD"));
        return matches ? [timeField] : [];
    });
    const booktime = isbook.flat()
    // **************************************** Already Booked 
    const AlreadyBooked = () => {
        Swal.fire({
            title: "Already Booked !!!",
            text: "Pleade Select onother Slot Time !!",
            icon: "info"

        })
        setclickTime(" ")
    }

    console.log(clickTime, "asdfghjkl;");

    return (
        <>
            <div className="container">
                {openBox == true ? (
                    <div className="flex mt-5 flex-col md:flex-row bg-blend-darken bg-black p-3 rounded-2xl  h-full">
                        <div className="w-full md:w-1/4 pt-4 ">
                            <h6 className="contact-text text-center txt-org font-semibold ">
                                TriangleTech
                            </h6>
                            <h4 className="contact-text text-center text-red-50 font-semibold">
                                Contact with us
                            </h4>
                        </div>
                        {/* **********************************  Second coloumn */}
                        <div className="w-full md:w-1/2  border-r-2 border-l-2">
                            <div className="calender">
                                <FullCalendar
                                    key={SlotData.join(",") + selectDate}
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    weekends={true}
                                    // events={events}
                                    editable={true}
                                    selectable={true}
                                    fixedWeekCount={true}
                                    contentHeight="auto"
                                    themeSystem="bootstrap5"
                                    /************************** daty Click  */
                                    dateClick={(date) => {
                                        console.log("pkpkpkpkpk");
                                        const dateformat = moment(date?.dateStr).format(
                                            "YYYY-MM-DD"
                                        );
                                        TimeShow(dateformat);
                                        setselectDate(dateformat);
                                    }}
                                    /************************** End click  */
                                    /*********************************** Color Change */
                                    dayCellDidMount={(arg) => {
                                        const dateSlot = moment(arg.date).format("YYYY-MM-DD");
                                        console.log(selectDate, "pk");

                                        if (SlotData?.includes(dateSlot)) {
                                            arg.el.style.backgroundColor = "#848484c9";
                                            arg.el.style.border = "none";
                                            arg.el.style.color = "white";
                                            arg.el.style.borderRadius = "6px";
                                            arg.el.style.webkitTextFillColor = "white";
                                        } else {
                                            arg.el.style.border = "none";
                                            // arg.el.style.backgroundColor = "red"
                                            arg.el.style.webkitTextFillColor = "#cacaca";
                                        }
                                        if (selectDate == dateSlot) {
                                            arg.el.style.backgroundColor = "red";
                                            arg.el.style.border = "none";
                                            arg.el.style.color = "white";
                                            arg.el.style.borderRadius = "6px";
                                            arg.el.style.webkitTextFillColor = "white";
                                        }
                                    }}
                                    /****************************************** End Color Change ------ */
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                />
                            </div>
                        </div>
                        {/* ******************************* Third Coumn     */}
                        <div className="w-full md:w-1/4 h">
                            <div className="timer px-3 py-3 ">
                                <h5 className="text-center  mb-2 font-semibold txt-org  ">
                                    Time
                                </h5>
                                <h6 className="text-center font-semibold text-zinc-50">
                                    Select Date{" "}
                                </h6>
                                {TimeSlot.length == 0 ? (
                                    <div className="time-icon text-center flex mt-5 justify-center items-center">
                                        <IoTimeOutline className="text-9xl text-zinc-300" />
                                    </div>
                                ) : (
                                    TimeSlot.map((item) => {
                                        const IsBooked = booktime.includes(item)
                                        console.log(IsBooked, ";;;;;");





                                        return (

                                            <p
                                                className={`border-1 cursor-pointer rounded-2xl px-3 py-2 text-center font-semibold   ${IsBooked ? "text-red-800  border-red-800" :
                                                    clickTime == item
                                                        ? "txt-org border-orange-400"
                                                        : "border-zinc-300 text-zinc-300"
                                                    }`}
                                                onClick={() => {
                                                    if (IsBooked == true) {
                                                        AlreadyBooked()
                                                        setclickTime(" ")

                                                    }
                                                    else {
                                                        setclickTime(item)
                                                    }
                                                }}
                                            >
                                                {item}
                                            </p>
                                        )
                                    })
                                )}
                            </div>
                            {/* **************** Next Button */}
                            <button
                                className="px-4 font-semibold mt-3 py-2 bg-orange-400 float-end rounded "
                                onClick={() => {
                                    if (clickTime == "" && selectDate == "") {
                                        SetopenBox(true)
                                        Swal.fire({
                                            title: "Slot Is Empty",
                                            text: "Please select date and Time ",
                                            icon: "info"
                                        })
                                    }
                                    else {
                                        SetopenBox(false)
                                    }
                                }

                                }
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="user-info   p-20 ">
                        <div className="block-form rounded flex flex-col bg-black md:flex-row justify-center items-center h-full">
                            <div className="contact-detail  h-full w-full md:w-1/4">
                                <div className=" h-full rounded-0 border-0">
                                    <h5 className="font-semibold text-orange-400 txt-org">
                                        Contact US{" "}
                                    </h5>
                                </div>
                            </div>
                            {/* ********** */}
                            <div className="user-form h-full mt-2 ps-4 border-l-2 mb-10 w-full md:w-1/2">
                                <div className="user-info w-full ">
                                    {/* ************************** */}
                                    <div className="form-control bg-black mt-1 border-0 ">
                                        <label className="text-zinc-50 mb-1 font-semibold">
                                            Your name <strong className="text-orange-400">*</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-zinc-800 px-2 text-amber-50 py-1 rounded w-full"
                                            name="name"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.name}
                                        />
                                    </div>
                                    {formik?.errors?.name && (
                                        <p className="text-red-300 font-semibold">
                                            {formik?.errors?.name}
                                        </p>
                                    )}

                                    {/* ***************************** */}
                                    <div className="form-control bg-black mt-1 border-0">
                                        <label className="text-zinc-50 mb-1 font-semibold">
                                            Email address{" "}
                                            <strong className="text-orange-400">*</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-zinc-800 px-2 text-amber-50 py-1 rounded w-full"
                                            name="email"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.email}
                                        />
                                    </div>
                                    {formik?.errors?.email && (
                                        <p className="text-red-300 font-semibold">
                                            {formik?.errors?.email}
                                        </p>
                                    )}
                                    {/* *************************** */}
                                    <div className="form-control bg-black mt-1 border-0">
                                        <label className="text-zinc-50 mb-1 font-semibold">
                                            Phone no. <strong className="text-orange-400">*</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-zinc-800 px-2 text-amber-50 py-1 rounded w-full"
                                            value={formik?.values?.number}
                                            onChange={formik?.handleChange}
                                            name="number"
                                        />
                                    </div>
                                    {formik?.errors?.number && (
                                        <p className="text-red-300 font-semibold">
                                            {formik?.errors?.number}
                                        </p>
                                    )}
                                    {/* **************************** */}
                                    <div className="form-control bg-black mt-1 border-0">
                                        <label className="text-zinc-50 mb-1 font-semibold">
                                            Meeting Purpose{" "}
                                            <strong className="text-orange-400">*</strong>
                                        </label>
                                        <textarea
                                            type="text"
                                            value={formik?.values?.purpose}
                                            onChange={formik?.handleChange}
                                            name="purpose"
                                            className="bg-zinc-800 px-2  text-amber-50 py-3 rounded w-full"
                                        />
                                    </div>
                                    {formik?.errors?.purpose && (
                                        <p className="text-red-300 font-semibold">
                                            {formik?.errors?.purpose}
                                        </p>
                                    )}
                                    {/* ************************************************ */}
                                </div>
                                <button
                                    type="button"
                                    className="bg-orange-400 font-semibold float-end me-2 mt-2 px-4 py-2 rounded "
                                    onClick={() => formik?.handleSubmit()}
                                >
                                    Submit
                                </button>
                            </div>
                            {/* *************** end user  */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
