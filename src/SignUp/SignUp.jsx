"use client"
import React, { useState } from "react";
import LMButton from "../Component/LMButton";
import Link from "next/link";
import apiService from "../lib/api/useApi.js";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false); 

  const validateFullName = () => {
    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
    } else {
      setFullNameError("");
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateAddress = () => {
    if (!address.trim()) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone Number is required");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError("");
    // Validate all fields
    validateFullName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateAddress();
    validatePhoneNumber();

    // Set form as touched once any input is interacted with
    setFormTouched(true);

    // Check if any errors exist and form has been touched
    if (
      formTouched &&
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !addressError &&
      !phoneNumberError
    ) {
      try {
        // Set loading state to true
        setLoading(true);
        // Make API request if all fields are valid
        const response = await apiService.post("api/signup", {
          fullName,
          email,
          password,
          address,
          phoneNumber,
        });
        handleToken(response);
        console.log(response, "sdaddata");
        // Handle success response
      } catch (error) {
        console.error("Error:", error);
        setError("Registration failed");
        // Handle error response
      } finally {
        // Set loading state to false
        setLoading(false);
      }
    }
  };

  const handleToken = (token) => {
    console.log(token, "token");
    // Store token in local storage or session storage
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={validateFullName}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {confirmPasswordError && (
            <p className="text-red-500">{confirmPasswordError}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={validateAddress}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {addressError && <p className="text-red-500">{addressError}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={validatePhoneNumber}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
          {phoneNumberError && (
            <p className="text-red-500">{phoneNumberError}</p>
          )}
          {error && <div>{error}</div>}

          <div className="text-center md:text-left">
            <LMButton type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </LMButton>
          </div>
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
