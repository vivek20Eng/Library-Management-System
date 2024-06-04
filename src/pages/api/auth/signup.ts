// pages/api/auth/signup.ts

import type { NextApiRequest, NextApiResponse } from "next";
// Yup is a schema builder for runtime value parsing and validation.
import * as yup from "yup";
import e, { createClient } from "../../../../dbschema/edgeql-js";
import jwt from "jsonwebtoken";

const client = createClient();

const userSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
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
    const { fullName, email, password, phoneNumber, role } = req.body;

    try {
      await userSchema.validate(req.body, { abortEarly: false });

      const newUser = e.insert(e.User, {
        full_name: fullName,
        username: email,
        email: email,
        password: password,
        phone: phoneNumber,
        role: role,
      });

      const result = await newUser.run(client);

      const accessToken = jwt.sign(
        { id: result.id, role: role, fullName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
        { httpOnly: true }
      );
      const refreshToken = jwt.sign(
        { id: result.id, role: role, fullName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" },
        { httpOnly: true }
      );
      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res
          .status(400)
          .json({ error: "Validation error", details: error.errors });
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
