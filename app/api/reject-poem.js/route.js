// pages/api/reject-poem.js

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    const db = await connectToDatabase();
    await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: 'Poem rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
