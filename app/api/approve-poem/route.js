// pages/api/approve-poem/route.js

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/db';

// Ensure you're using the correct Next.js API route structure
export async function POST(req) {
  const { id } = await req.json(); // Parse JSON body

  try {
    const db = await connectToDatabase();
    const poem = await db.collection('pending_poems').findOne({ _id: new ObjectId(id) });

    if (!poem) {
      return new Response(JSON.stringify({ message: 'Poem not found' }), { status: 404 });
    }

    await db.collection('approved_poems').insertOne({ ...poem, likes: 0, comments: [] });
    await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Poem approved' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
