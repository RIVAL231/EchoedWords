import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const pendingPoems = await db.collection('pending_poems').find().toArray();

    // Add a timestamp to the response to ensure uniqueness
    const response = {
      poems: pendingPoems,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '-1'
      },
    });
  } catch (error) {
    console.error('Error fetching pending poems:', error);
    return NextResponse.json({ message: 'Error fetching pending poems' }, { status: 500 });
  }
}