// pages/api/approve-poem/route.js
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/db';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  const { id } = await req.json();

  try {
    const db = await connectToDatabase();
    const poem = await db.collection('pending_poems').findOne({ _id: new ObjectId(id) });

    if (!poem) {
      return new Response(JSON.stringify({ message: 'Poem not found' }), { status: 404 });
    }

    // Insert into approved_poems and delete from pending_poems
    await db.collection('approved_poems').insertOne({ ...poem, likes: 0, comments: [] });
    await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Poem approved' }), { status: 200 });
  } catch (error) {
    console.error('Error approving poem:', error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}