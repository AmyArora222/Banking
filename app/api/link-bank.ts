import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bankId, accountNumber, ifsc } = req.body;

  try {
    const response = await axios.post('https://api.setu.co/v2/accounts', {
      bank_id: bankId,
      account_number: accountNumber,
      ifsc: ifsc,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SETU_API_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error linking bank account', error });
  }
}
