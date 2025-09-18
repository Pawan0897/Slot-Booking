import { useMutation } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { VerifyOTP } from "../Request/endpoints";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function OTPverify() {
    const [otp, setOtp] = useState("".padEnd(6, " "));
    const navigate = useNavigate()
    const inputRefs = useRef([]);
    // const [step, setStep] = useState(1);
    // const [timer, setTimer] = useState(180);
    // useEffect(() => {
    //     let t;
    //     if (step === 1 && timer > 0) {
    //         t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    //     }
    //     return () => clearInterval(t);
    // }, [step, timer]);

    const handleOtpChange = (e, i) => {
        const val = e.target.value;
        if (/^[0-9]?$/.test(val)) {
            let otpArray = otp.split("");
            otpArray[i] = val || " ";
            const newOtp = otpArray.join("");
            setOtp(newOtp);

            if (val && i < 5) {
                inputRefs.current[i + 1].focus();
            }
        }
    };

    const handleOtpBackspace = (e, i) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) {
            inputRefs.current[i - 1].focus();
        }
    };
    //  *****************************************
    const OTPvalid = useMutation({
        mutationFn: (body) => VerifyOTP(body),
        onSuccess: (res) => {
            if (res?.data?.statuscode == 200) {
                Swal.fire({
                    title: `${res?.data?.message}`,
                    text: `${res?.data?.text}`,
                    icon: "success"
                })
                navigate("/admin")
            }
            else {
                Swal.fire({
                    title: `${res?.data?.message}`,
                    text: `${res?.data?.text}`,
                    icon: "info"

                })
            }

        }

    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
                {/******* Orange header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 text-center font-semibold">
                    Sign up
                </div>
                {/* ***************************  */}

                <div className="p-6">

                    {/* Step 3 — Enter OTP */}

                    <>
                        <h2 className="text-xl font-bold text-center mb-3 text-gray-800 mb-1">
                            OTP Verification
                        </h2>


                        {/* <div className="text-center text-orange-500 font-medium mb-4">
                                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                                {String(timer % 60).padStart(2, "0")}
                            </div> */}

                        <div className="flex justify-center gap-2 mb-6">
                            {otp.split("").map((d, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={d.trim()}
                                    onChange={(e) => handleOtpChange(e, i)}
                                    onKeyDown={(e) => handleOtpBackspace(e, i)}
                                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            ))}
                        </div>

                        <button type="button" onClick={() => {
                            let body = {
                                otp: otp
                            }
                            OTPvalid.mutate(body)
                        }} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mb-3">
                            Submit
                        </button>


                    </>

                </div>
            </div>
        </div>
    );
}
