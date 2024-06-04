// pages/api/user.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import e,{ createClient, $infer } from '../../../dbschema/edgeql-js';

export const client = createClient();

const selectUser = e.select(e.User, () => ({
  id: true,
  username: true,
  email: true,
  phone: true,
  role: true,
}));
export type Users = $infer<typeof selectUser>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await selectUser.run(client);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
