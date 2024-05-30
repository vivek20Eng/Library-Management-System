// pages/api/user.ts

import type { NextApiRequest, NextApiResponse } from "next";
// Yup is a schema builder for runtime value parsing and validation.
import * as yup from "yup";
import e, { createClient, $infer } from "../../../../dbschema/edgeql-js";

export const client = createClient();
// Define the validation schema using yup
const userSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  role: yup
    .string()
    .oneOf(["admin", "user"], "Invalid role")
    .required("Role is required"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("userrrr signuppppp",req.data)

    const { fullName, email, password, phoneNumber, role } = req.body;
console.log(req.body,"Please:'''---")
    try {
      // Validate the request body against the schema
      await userSchema.validate(req.body, { abortEarly: false });

      // Create a new user
      const newUser = e.insert(e.User, {
        full_name: fullName,
        username: email,
        email: email,
        password: password,
        phone: phoneNumber,
        role: role,
      });

      // Execute the insert operation
      const result = await newUser.run(client);

      // Assuming the insert operation returns the newly created user
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // If the error is a validation error, return a 400 status with the validation errors
        return res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
      } else {
        console.error("Error inserting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
