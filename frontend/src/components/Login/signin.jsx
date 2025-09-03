import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";
// import "../Login/signin.css"
//! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Pasword is required"),
});
const Login = () => {
  //! Mutation here
  const mutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });
  //! Dispatch
  const dispatch = useDispatch();
  //!Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "pavan234@gmail.com",
      password: "appadam",
    },
    validationSchema,
    onSubmit: (values) => {
      // Implementation of form submission
      mutation
        .mutateAsync(values)
        .then((data) => {
          //Dispatch action from redux
          dispatch(loginAction(data));
          // Save the user into localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => 
          console.log(e));

      //
    },
  });

  return (
    <div className="Login">
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        {/* display alert message */}
        {mutation.isPending && (
          <AlertMessage type="loading" message="Loading please wait..." />
        )}
        {mutation.isSuccess && (
          <AlertMessage type="success" message="Login Success" />
        )}
        {mutation.isError && (
          <AlertMessage
            type="error"
            message={mutation.error.response.data.message}
          />
        )}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email address"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-white bg-black transition hover:bg-white hover:text-black hover:transition  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;