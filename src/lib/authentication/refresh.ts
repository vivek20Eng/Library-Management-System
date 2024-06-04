// pages/api/auth/refresh.ts

import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.send(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.send(403);
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.json({ accessToken });
  });
}
