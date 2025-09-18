import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import AdminHeader from "./Admin-Header";
import Bakgounrd from "./Bakgounrd";
// ********************************************** timepicker npm
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
/*********************************************** CAlender Npm */
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/week/day views
import timeGridPlugin from "@fullcalendar/timegrid"; // For time-based views
import interactionPlugin from "@fullcalendar/interaction"; // For interactivity like drag and drop
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GettAddeddByAdminSlot,
  GetTimeSlot,
  SlotAddByAdmin,
} from "../../Request/endpoints";
import swal from "sweetalert2";
import { useToken } from "../../hooks/useToken";

function Admin() {
  const token = useToken()
  const [value, setValue] = useState("09:00 AM");
  /***********************  *******************Modal State Change..... */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  /************************************************ Show DateAddded Time ********************************** */
  const [OpenTimeModal, SetTimeModal] = useState(false);

  const OpenShowTime = () => SetTimeModal(true);
  const CloseShowTime = () => SetTimeModal(false);
  // const handleShow = () => setShow(true);
  // ******************************       Select Time Fetch added Time ***********************************************************

  const data = useQuery({
    queryKey: ["gettime"],
    queryFn: () => GetTimeSlot(),
  });

  const getdata = data?.data?.data;
  console.log(getdata);

  /******************************* Calender Hanlde function and opertation  **********************************************************/

  const [db, setdb] = useState([]);

  // const handleDateClick = (date) => {
  //   const datefor = moment(date?.dateStr).format("YYYY-MM-DD");

  //   setdb((pre) =>
  //     pre.includes(datefor)
  //       ? pre.filter(
  //           (d) => d !== datefor
  //         )
  //       : [...pre, datefor]
  //   );
  // };
  /******************************************** Add date if clicked *************************************************************** */
  const [DateSlot, SetDateSlot] = useState([]);
  const AddDate = (item) => {
    SetDateSlot((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };
  const ColorChgn = DateSlot?.map((item) => {
    return item;
  });
  /************************************** Get SLot All Addedd y Admin */

  const GetSlot = useQuery({
    queryKey: ["slotadd"],
    queryFn: () => GettAddeddByAdminSlot(),
  });
  useEffect(() => {
    queryClient?.invalidateQueries({ queryKey: ["slotadd"] });
  }, []);

  /***************************************** Addedd Slot ****************************************************************** */
  /************************* queryclient */
  const queryClient = useQueryClient();
  const AddedSlot = useMutation({
    mutationFn: ({ body, token }) => SlotAddByAdmin(body, token),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        GetSlot.refetch();
        SetDateSlot([]);
        queryClient?.invalidateQueries({ queryKey: ["slotadd"] });
        console.log(res?.data?.statuscode);
        swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
          text: `${res?.data?.text}`,
        });
      } else {
        swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
          text: `${res?.data?.text}`,
        });
      }
    },
  });

  /************************* Show only slot date  */
  const GetAddSlotDate =
    GetSlot?.data?.data?.data?.map((item) => item?.slotDate) || [];
  /*************************** to nested array */

  const innerSloteDate =
    GetSlot?.data?.data?.data?.map((item) => item.slotDate).flat() || [];
  /********************************************* Click on DateShow Time ************************* */
  const [SlotForShowTime, SetSlotShowTime] = useState("");
  const GetSlotForTime = GetSlot?.data?.data?.data?.find(
    (item) => item?.slotDate == SlotForShowTime
  );
  const ShowOnModalTime = GetSlotForTime
    ? GetSlotForTime?.slotTime?.flat()
    : [];
  console.log(ShowOnModalTime);
  /******************************************************** */

  return (
    <>
      <div className="h-screen  relative  pt-10  w-full">
        {/*********************************** fro inner back blur  */}
        <Bakgounrd />

        <div className="container relative z-10 ">
          {/************************************** navbar............... */}
          <AdminHeader />
          <div className="flex  relative mt-3 gap-10">
            {/* ************************************** Calender */}
            <div className="w-50   bg-dark rounded ">
              <div className="calender w-full max-w-4xl mx-auto p-4  rounded-lg shadow">
                <FullCalendar
                  /******* it used for calender render  */
                  key={
                    db.join(",") +
                    GetAddSlotDate.join(",") +
                    innerSloteDate.join(",")
                  }
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  fixedWeekCount={true}
                  contentHeight="auto"
                  /************** *************************click The day button  */
                  dateClick={(date) => {
                    const datefor = moment(date?.dateStr).format("YYYY-MM-DD");
                    // ******************************* for checking that slot date is already added on db or not
                    if (innerSloteDate?.includes(datefor)) {
                      SetTimeModal(true);
                      /*********fro click to date show addedd time  */
                      SetSlotShowTime(datefor);
                      return;
                    }
                    setdb((prev) =>
                      prev.includes(datefor)
                        ? prev.filter((p) => p !== datefor)
                        : [...prev, datefor]
                    );
                  }}
                  /********************************************* */
                  /*************** day select change color of */

                  dayCellDidMount={(arg) => {
                    const cellDate = moment(arg.date).format("YYYY-MM-DD");
                    if (db.includes(cellDate)) {
                      arg.el.style.backgroundColor = "red";
                      arg.el.style.color = "white";
                      arg.el.style.borderRadius = "6px";
                      arg.el.style.webkitTextFillColor = "white";
                    } else if (innerSloteDate.includes(cellDate)) {
                      arg.el.style.backgroundColor = "black";
                      arg.el.style.color = "white";
                      arg.el.style.borderRadius = "6px";
                      arg.el.style.webkitTextFillColor = "grey";
                    }
                  }}
                  headerToolbar={{
                    left: "prev,next",
                    right: "title",
                    center: "",
                  }}
                  selectMirror={true}
                  dayMaxEvents={true}
                // events={/}
                />
              </div>
            </div>
            {/* ****************************************************** Time */}
            <div className="w-full bg-white">
              <div className="time">
                <div className="time-box">
                  <div className="box p-2 gap-3 flex flex-wrap">
                    {/* <p onClick={() => setarr((pre) => [...pre,"pk"])}>9:00 AM</p> */}
                    {/* /************** DAte fetch data */}
                    {getdata?.data?.map((item) => {
                      return (
                        <>
                          <button
                            onClick={() => AddDate(item?.SetTime)}
                            className={`${ColorChgn.includes(item?.SetTime)
                              ? "bg-red-800"
                              : "bg-blue-800"
                              }  text-amber-50 whitespace-nowrap shrink-0 min-w-fit px-2 py-2 rounded`}
                            type="button"
                          >
                            {item?.SetTime}
                          </button>
                        </>
                      );
                    })}
                  </div>
                </div>
                {/* *********************************** Submit button */}
                <button
                  type="submit"
                  className="py-2 px-2 text-amber-50 bg-green-800 rounded mt-2 flex  float-end me-4 ms-2"
                  onClick={() => {
                    let body = {
                      slotDate: db,
                      slotTime: ColorChgn,
                    };
                    AddedSlot.mutate({ body, token });
                  }}
                >
                  Submit Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ********************************************Show onc click date Added Slot Time ******************************* */}
      <Modal show={OpenTimeModal} onHide={CloseShowTime}>
        <Modal.Header closeButton>
          <Modal.Title>Slot Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="showslottime">
            {ShowOnModalTime?.map((item) => {
              return (
                <>
                  <button className="py-2 px-2 ms-2 mt-2  rounded text-amber-100 flex-wrap bg-red-800">
                    {item}
                  </button>
                </>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={CloseShowTime}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ****************************************** Modal ****************************************** */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Time</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex bg-black justify-center">
          {/* ************************************* Date Picker If Extra Date add */}
          <div className="date-picker border-0 bg-amber-50 rounded mb-5 mt-5">
            <TimePicker
              onChange={setValue}
              value={value}
              disableClock={true}
              clearIcon={null}
              format="hh:mm a"
              className="w-full border-0  rounded px-4 py-2 shadow-sm focus:outline-none  text-lg"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Admin;
