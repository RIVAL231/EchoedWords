import { connectToDatabase } from "@/lib/db";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const approvedPoems = await db.collection('approved_poems').find().toArray();

    // Add a timestamp to the response to ensure uniqueness
    const response = {
      poems: approvedPoems,
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
    console.error('Error fetching approved poems:', error);
    return NextResponse.json({ message: 'An error occurred while fetching approved poems.' }, { status: 500 });
  }
}
