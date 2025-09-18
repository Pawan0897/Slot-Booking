import React, { useReducer, useState } from "react";
import Bakgounrd from "../Bakgounrd";
import AdminHeader from "../Admin-Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TimePicker from "react-time-picker";
import moment from "moment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddTimeByAdmin } from "../../../Request/endpoints";
export default function AddTime() {
  /******************************* Time State */
  // const [timer  , setTime] = useState("12:00 AM");

  /******************************************** Modal state */
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(timer, "oooooooooooooooooooooooooooooo");
  const [time, setTime] = useState("08:30 AM");
  // ***************************************************************

  const handleTimeChange = (val) => {
    const formatted = moment(val, "HH:mm").format("hh:mm A");
    setTime(formatted);
    console.log(typeof(time),",..............,");
    
  };
  /************************************Ad time function  */
  const AddTimfun = useMutation({
    mutationFn:(body) => AddTimeByAdmin(body),
    onSuccess:(res) => console.log(res,".........................")
    
  })
  // *************************************************************************************\

  function wrapBtn(Component) {
  return function WrappedComponent(props) {
    console.log("return component render");
    return <Component {...props} />;
  };
}
  
        const button = () => <button>click me </button>
      
        const Btnwrp = wrapBtn(button)

// *************************************************

const intialvalue = {
  count :0
}

const reducer = (state,action) =>
{
if(action.type == "inc")
  {
 return { count: state.count += 1}
  }
else if(action.type = "min"){
return { count: state.count -=1}
}
}

const [state,dispatch] = useReducer(reducer,intialvalue)



  return (
    <> 

<button onClick={() => dispatch({type:"inc"})}>plus</button>
<button onClick={() => dispatch({type:"min"})}>min</button>

   {/* <Btnwrp /> */}
{
  <h2>{state.count}</h2>
}


      <div className="h-screen relative pt-10 w-full">
        {/* ************************background image */}
        <Bakgounrd /> 
        
        {/* *********************** start the  */}
        <div className="container z-10 relative">
          <AdminHeader />
          {/* ***************************** section two  */}
          <div className="row px-2 mt-3 ">
            <div className="col-md-12 bg-amber-50 backdrop-blur-sm   shadow-lg rounded">
              <div className="add-time">
                <button
                  className="bg-red-900 text-white rounded mt-3 py-2 px-3"
                  onClick={handleShow}
                >
                  Add Time
                </button>
              </div>
              {/* *************************** Section  */}
              <div className="time-tabel w-full mt-3 mb-5 shadow-md rounded  h-30 ">
                <div className="flex gap-4">
                  <p className="bg-blue-900 text-white py-2 px-3 rounded">
                    12:00 AM
                  </p>
                  <p className="bg-blue-900 text-white py-2 px-3 rounded">
                    {time}
                  </p>
                  <p className="bg-blue-900 text-white py-2 px-3 rounded">
                    12:00 AM
                  </p>
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
          <Button variant="primary" onClick={() =>{
            let body = {
              SetTime:time
            }
             AddTimfun.mutate(body)

          }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
