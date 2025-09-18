import React from 'react'
import img from "../../images/two.jpg";
export default function Bakgounrd() {
  return (
    <>
    <div
          className="absolute h-full blur bottom-0 right-0  top-0 bg-cover   left-0"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      
    </>
  )
}
