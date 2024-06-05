"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import LMToast from "../Component/LMToast";
import CircularProgress from '@mui/material/CircularProgress';
import {authenticate} from "../lib/authentication/auth.js"
function SignUp() {
  const ref = useRef();
  const buttonRef = useRef();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "",
    phoneNumber: "",
    username: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "email" && { username: value }) 
      // Set username to email
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case "fullName":
        newErrors.fullName = value.trim() ? "" : "Full Name is required";
        break;
      case "email":
        newErrors.email = value.trim()
          ? /\S+@\S+\.\S+/.test(value)
            ? ""
            : "Invalid email address"
          : "Email is required";
        break;
      case "password":
        newErrors.password =
          value.trim().length >= 6
            ? ""
            : "Password must be at least 6 characters long";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value === formData.password ? "" : "Passwords do not match";
        break;
      case "address":
        newErrors.address = value.trim() ? "" : "Address is required";
        break;
      case "phoneNumber":
        newErrors.phoneNumber = value.trim() ? "" : "Phone Number is required";
        break;
      case "role":
        newErrors.role = value ? "" : "Role is required";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFormData();
    if (isValid) {
      try {
        setLoading(true);
        console.log(formData, "formData:");
        const response = await axios.post("api/auth/signup", formData);
        sessionStorage.setItem("accessToken",response.data.accessToken)
        ref.current.showToast("Registration Successful! 🎉", "success");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          role: "",
          phoneNumber: "",
          username: ""
        });
      } catch (error) {
        ref.current.showToast("Registration Failed!", "error");
        console.error("Error:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    } else {
      ref.current.showToast("Please Fill All Required Fields", "warn");
    }
  };

  const validateFormData = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      switch (key) {
        case "fullName":
          newErrors.fullName = value.trim() ? "" : "Full Name is required";
          break;
        case "email":
          newErrors.email = value.trim()
            ? /\S+@\S+\.\S+/.test(value)
              ? ""
              : "Invalid email address"
            : "Email is required";
          break;
        case "password":
          newErrors.password =
            value.trim().length >= 6
              ? ""
              : "Password must be at least 6 characters long";
          break;
        case "confirmPassword":
          newErrors.confirmPassword =
            value === formData.password ? "" : "Passwords do not match";
          break;
        case "address":
          newErrors.address = value.trim() ? "" : "Address is required";
          break;
        case "phoneNumber":
          newErrors.phoneNumber = value.trim()
            ? ""
            : "Phone Number is required";
          break;
        case "role":
          newErrors.role = value ? "" : "Role is required";
          break;
        default:
          break;
      }
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };



  return (
    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <LMToast ref={ref} />
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded-md w-full text-slate-300/80 bg-transparent px-3 py-2 mt-2 focus:outline-none focus:border-[#B4ADEA]"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-50 border bg-transparent border-gray-300 px-3 py-2.5 text-slate-300/80 text-sm mt-2 rounded-lg focus:outline-none focus:border-[#B4ADEA] block w-full p-2."
          >
            <option value=""class="text-black">Select Role</option>
            <option value="admin"class="text-black">Admin</option>
            <option value="user" class="text-black">User</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          <div className="text-center md:text-left">
            <button
              type="submit"
              disabled={loading}
              ref={buttonRef}
              className="border rounded-md w-full text-[#FDFFF7] px-3 py-2 mt-2 bg-[#6b5dd5] duration-100 hover:bg-[#B4ADEA] focus:outline-none focus:bg-blue-600 dis"
            >
              {loading ? <CircularProgress size="sm" color="success" determinate={false} />: "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <Link
            className="text-[#B4ADEA] hover:text-[#B4ADEA]] hover:underline hover:underline-offset-4 "
            href="/login"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default SignUp;
