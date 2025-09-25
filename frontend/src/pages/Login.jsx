import { useFormik } from "formik";
import * as yup from "yup";
import AdminHeader from "./admin/Admin-Header";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AdminLogin } from "../Request/endpoints";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AddDetail, AddStatus, AddToken } from "../Redux/Reducer";
import { status } from "./status";
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ***************************************************
    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema: yup.object({
            Email: yup.string().email().required(),
            Password: yup.string().required(),
        }),
        onSubmit: (values) => {
            UserLogin.mutate(values)

        },
    });
    /************************************ api handle */
    const UserLogin = useMutation({
        mutationFn: (value) => AdminLogin(value),
        onSuccess: (res) => {
            if (res?.data?.statuscode == 200) {
                dispatch(AddToken(res?.data?.data?.token))
                dispatch(AddDetail(res?.data?.data?.isActive))
                dispatch(AddStatus(status?.Active))

                Swal.fire({
                    title: `${res?.data?.message}`,
                    icon: "success"
                })
                navigate('/admin')
            }
            else {
                Swal.fire({
                    title: `${res?.data?.message}`,
                    icon: "info"
                })
            }

        }
    })
    return (
        <>
            <AdminHeader />
            {/* ************************************************************************************************************************/}
            <section className="bg-orange-50 h-screen">
                <div className="container h-full mx-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-7/12 w-full   mt-4 p-5">
                            <div className="form-block bg-white  rounded-2xl overflow-hidden shadow-2xl w-50 m-auto ">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 text-center font-semibold">
                                    Login
                                </div>
                                <div className="form py-3 px-3 ">
                                    {/* *************************** Email  */}
                                    <div className="formcontrol">
                                        <label htmlFor="" className="d-block mb-1 font-medium">
                                            Email{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-gray-200 w-full  py-2 px-3 rounded focus:outline-none"
                                            name="Email"
                                            value={formik?.values?.Email}
                                            onChange={formik?.handleChange}
                                        />
                                        {formik?.errors?.Email && (
                                            <p className="text-red-600 mb-0">
                                                {formik?.errors?.Email}
                                            </p>
                                        )}
                                    </div>
                                    {/* ****************************** Password */}
                                    <div className="formcontrol mt-3">
                                        <label htmlFor="" className="d-block mb-1 font-medium">
                                            Password{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-gray-200  py-2 px-3 rounded w-full focus:outline-none"
                                            name="Password"
                                            value={formik?.values?.Password}
                                            onChange={formik?.handleChange}
                                        />
                                        {formik?.errors?.Password && (
                                            <p className="text-red-600 mb-0">
                                                {formik?.errors?.Password}
                                            </p>
                                        )}
                                    </div>

                                    {/* ******************************* link singup */}
                                    <div className="text-link  flex justify-center gap-2 mt-2">

                                        <p onClick={() => navigate("/signup")} className=" mb-0 font-semibold text-orange-500 mt-1 cursor-pointer hover:text-red-800 hover:duration-150">
                                            Create Your Account
                                        </p>
                                        <p className=" mb-0 font-semibold text-orange-500 mt-1 ">or</p>
                                        <p onClick={() => navigate("/login")} className=" mb-0 font-semibold text-orange-500 mt-1 cursor-pointer hover:text-red-800 hover:duration-150">
                                            Login
                                        </p>
                                    </div>
                                    {/* ******************************** Submit  */}
                                    <div className="button flex justify-center  ">
                                        <button type="submit"
                                            className="py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-600 text-center  rounded mb-3 mt-2 text-white"
                                            onClick={formik?.handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    {/* *************** end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
