

// pages/api/pending-poems/route.js
import { connectToDatabase } from '../../../lib/db';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const pendingPoems = await db.collection('pending_poems').find().toArray();
    
    return new Response(JSON.stringify(pendingPoems), { status: 200 });
  } catch (error) {
    console.error('Error fetching pending poems:', error);
    return new Response(JSON.stringify({ message: 'Error fetching pending poems' }), { status: 500 });
  }
}

