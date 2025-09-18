import { useState } from "react";
import Bakgounrd from "../Bakgounrd";
import AdminHeader from "../Admin-Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TimePicker from "react-time-picker";
import moment from "moment";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTimeByAdmin, GetTimeSlot } from "../../../Request/endpoints";
import swal from "sweetalert2"
import { useToken } from "../../../hooks/useToken";
export default function AddTime() {
  const queryclient = useQueryClient()
  /******************************* Time State */
  // const [timer  , setTime] = useState("12:00 AM");

  /******************************************** Modal state */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useToken()
  const [time, setTime] = useState("08:30 AM");
  // ***************************************************************

  const handleTimeChange = (val) => {
    const formatted = moment(val, "HH:mm").format("hh:mm A");
    setTime(formatted);
  };
  /************************************Ad time function  */
  const AddTimfun = useMutation({
    mutationFn: ({body,token}) => AddTimeByAdmin(body,token),
    onSuccess: (res) => {
      setShow(false)
      if (res?.data?.statuscode == 200) {
        queryclient.invalidateQueries({ queryKey: ["gettime"] })
        swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res?.data?.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      else {
        swal.fire({
          position: "top-end",
          icon: "info",
          title: `${res?.data?.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

  })
  /********** Get The Time  */

  const data = useQuery({
    queryKey: ["gettime"],
    queryFn: () => GetTimeSlot()
  })
  const GetTime = data?.data?.data;




  // *************************************************************************************\
  return (
    <>



      <div className="h-screen relative pt-10 w-full">
        {/* ************************background image */}
        <Bakgounrd />

        {/* *********************** start the  */}
        <div className="container z-10 relative">
          <AdminHeader />
          {/* ***************************** section two  */}
          <div className="row px-2 mt-3 ">
            <div className="col-md-12 bg-amber-50 backdrop-blur-sm   shadow-lg rounded">
              <div className="add-time  px-2">
                <button
                  className="bg-red-900 text-white rounded mt-3 py-2 px-3"
                  onClick={handleShow}
                >
                  Add Time
                </button>
              </div>
              {/* *************************** Section  */}
              <div className="time-tabel w-full  px-2 mt-3 mb-5 shadow-md rounded   ">
                <div className="flex gap-4 flex-wrap">
                  {
                    GetTime?.data?.map((item) => {
                      return (
                        <>

                          <p className="bg-blue-900 text-white py-2 px-3 rounded">
                            {item?.SetTime}
                          </p>

                        </>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* *************************************MODAL........ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Time</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center my-4">
          <div className="time-modal  p-2 rounded shadow-md">
            <TimePicker
              onChange={handleTimeChange}
              value={time}
              disableClock={true}
              format="hh:mm a"
              clearIcon={null}

            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <>

          </>
          <Button variant="primary" onClick={() => {
            let body = {
              SetTime: time

            }
            AddTimfun.mutate({body,token})

          }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
