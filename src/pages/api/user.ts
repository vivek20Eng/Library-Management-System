// pages/api/user.ts

import type {NextApiRequest, NextApiResponse} from 'next';
import {User} from "../../lib/server/models/database"
// import e, {$infer} from '../../../dbschema/edgeql-js';
// export const client = createClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const selectUser = await User.select((user) => ({
      id: true,
      username: true,
      order_by: user.username,
    }));

    res.status(200).json(selectUser);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
