import { connectToDatabase } from "@/lib/db";


export async function GET() {
  try {
    const db = await connectToDatabase();
    const approvedPoems = await db.collection('approved_poems').find().toArray();

    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    });

    return new Response(JSON.stringify(approvedPoems), { status: 200, headers });
  } catch (error) {
    console.error('Error fetching approved poems:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while fetching approved poems.' }), { status: 500 });
  }
}
