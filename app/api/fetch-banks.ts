import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://www.saltedge.com/connect/7bc0f0430ea7b434b257f1109e2a6eab9eee63a2afb468062b3d7d457cef264f/new', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SETU_API_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banks', error });
  }
}
