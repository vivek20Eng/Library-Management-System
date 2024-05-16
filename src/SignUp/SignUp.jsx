"use client";
import React, { useState } from "react";
import LMButton from "../Component/LMButton";
import Link from "next/link";
import apiService from "../lib/api/useApi.js";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field onChange
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
        const response = await apiService.post("api/signup", formData);
        handleToken(response);
        // Reset submitError state on successful submission
        setSubmitError("");
      } catch (error) {
        console.error("Error:", error);
        setSubmitError("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setSubmitError("Please fill in all fields correctly.");
    }
  };

  const validateFormData = () => {
    const newErrors = {};

    // Validation logic...
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
        default:
          break;
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    // Redirect user to dashboard or another page
    // Example: history.push('/dashboard');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}

          <div className="text-center md:text-left">
            <LMButton type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </LMButton>
          </div>
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
        </form>

        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
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
