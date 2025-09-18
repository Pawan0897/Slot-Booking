import { useFormik } from "formik";
import AdminHeader from "./admin/Admin-Header";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AdminRegister } from "../Request/endpoints";
import Swal from "sweetalert2";

export default function Register() {
    const formik = useFormik({
        initialValues: {
            Name: "",
            Email: "",
            // Phone: "",
            Password: "",
            conformPassword: "",
        },
        validationSchema: yup.object({
            Name: yup.string().required(),
            Email: yup.string().email().required(),
            // Phone: yup.string().required(),
            Password: yup.string().required(),
            conformPassword: yup.string().required(),
        }),
        onSubmit: (values) => {

            if (formik?.values?.Password === formik?.values?.conformPassword) {
                AdminSignup.mutate(values)
            }
            else {

                Swal.fire({
                    title: "Can't matched  Password !!!",
                    text: "Please Math The conform Password !!!",
                    icon: "error"
                })
            }
        }
    });
    const navigate = useNavigate();
    // ******************** Api operations
    const AdminSignup = useMutation({
        mutationFn: (val) => AdminRegister(val),
        onSuccess: (res) => {
            if (res?.data?.statuscode == 200) {
                Swal.fire({
                    title: `${res?.data?.message}`,
                    icon: "success",
                    text: `${res?.data?.text}`
                })
                navigate("/otpverify")
            }
            else {
                Swal.fire({
                    title: `${res?.data?.message}`,
                    icon: "info",
                    text: `${res?.data?.text}`
                })
            }

        }
    })
    console.log(formik?.values);

    return (
        <>
            <AdminHeader />
            <section className="bg-orange-50 h-screen">
                <div className="container ">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="mt-4 md:w-11/12 flex justify-center w-full">
                            <div className="form-blockrounded-2xl w-50  p-5">
                                <div className="form  border-gray-300  rounded-2xl bg-amber-50  overflow-hidden drop-shadow-2xl">
                                    <div className="bg-gradient-to-r mb-3 from-orange-500 to-orange-600  text-white px-4 py-3 text-center font-semibold">
                                        Sign up
                                    </div>
                                    {/* ************ name */}
                                    <div className="formcontrol  px-4 py-2">
                                        <label htmlFor="" className="font-medium mb-1 text-black ">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="Name"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.Name}
                                            className="bg-gray-200 w-full px-3 py-2 rounded focus:outline-none"
                                        />
                                        {/* ****** */}
                                        {formik?.errors?.Name && (
                                            <p className="text-red-400 mb-0">
                                                {formik?.errors?.Name}
                                            </p>
                                        )}
                                    </div>
                                    {/* ********************** Email */}
                                    <div className="formcontrol px-4 py-2">
                                        <label htmlFor="" className="font-medium mb-1  text-black ">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="Email"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.Email}
                                            className="bg-gray-200 w-full px-3 py-2 rounded focus:outline-none"
                                        />
                                        {/* ****** */}
                                        {formik?.errors?.Email && (
                                            <p className="text-red-400 mb-0">
                                                {formik?.errors?.Email}
                                            </p>
                                        )}
                                    </div>
                                    {/* **********************  Password  */}
                                    <div className="formcontrol px-4 py-2">
                                        <label
                                            htmlFor=""
                                            className="font-medium mb-1    text-black "
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="text"
                                            name="Password"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.Password}
                                            className="bg-gray-200 w-full px-3 py-2 rounded focus:outline-none"
                                        />
                                        {/* ****** */}
                                        {formik?.errors?.Password && (
                                            <p className="text-red-400 mb-0">
                                                {formik?.errors?.Password}
                                            </p>
                                        )}
                                    </div>
                                    {/* ********************** Conform Password  */}
                                    <div className="formcontrol px-4 py-2">
                                        <label htmlFor="" className="font-medium mb-1  text-black ">
                                            Conform Password
                                        </label>
                                        <input
                                            type="text"
                                            name="conformPassword"
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.conformPassword}
                                            className="bg-gray-200 w-full px-3 py-2 rounded focus:outline-none"
                                        />
                                        {/* ****** */}
                                        {formik?.errors?.conformPassword && (
                                            <p className="text-red-400 mb-0">
                                                {formik?.errors?.conformPassword}
                                            </p>
                                        )}
                                    </div>
                                    {/* ******************************* link singup */}
                                    <div className="text-link  flex justify-center gap-2 mb-2">
                                        <p
                                            onClick={() => navigate("/signup")}
                                            className="  font-semibold text-orange-500 mt-1 mb-0 cursor-pointer hover:text-red-800 hover:duration-150"
                                        >
                                            Create Your Account
                                        </p>
                                        <p className="  font-semibold text-orange-500 mt-1 mb-0 ">
                                            or
                                        </p>
                                        <p
                                            onClick={() => navigate("/login")}
                                            className="  font-semibold text-orange-500 mt-1 mb-0 cursor-pointer hover:text-red-800 hover:duration-150"
                                        >
                                            Login
                                        </p>
                                    </div>
                                    {/* *************** Submit */}
                                    <div className="button-submit flex justify-center mb-4">
                                        <button type="button" onClick={() => formik?.handleSubmit()} className="bg-gradient-to-r from-orange-500 to-orange-600  py-2 px-3 ms-3  text-amber-50 font-medium   rounded">
                                            Submit
                                        </button>
                                    </div>

                                    {/* ****************end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
