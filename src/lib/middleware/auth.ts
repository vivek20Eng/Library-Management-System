// middleware/auth.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
