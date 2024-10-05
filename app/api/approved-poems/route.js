import { connectToDatabase } from '../../../lib/db';

// Define the GET function to fetch approved poems
export async function GET() {
  try {
    const db = await connectToDatabase();
    const approvedPoems = await db.collection('approved_poems').find().toArray();

    return new Response(JSON.stringify(approvedPoems), { status: 200 });
  } catch (error) {
    console.error('Error fetching approved poems:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while fetching approved poems.' }), { status: 500 });
  }
}

// Optionally, if you want to handle POST requests, you can define it here as well
// export async function POST(req) {
//   // Implementation for approving a poem...
// }
