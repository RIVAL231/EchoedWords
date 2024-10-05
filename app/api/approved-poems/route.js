export async function GET() {
  try {
    const db = await connectToDatabase();
    const approvedPoems = await db.collection('approved_poems').find().toArray();

    return new Response(JSON.stringify(approvedPoems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // Prevent caching
      },
    });
  } catch (error) {
    console.error('Error fetching approved poems:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while fetching approved poems.' }), { status: 500 });
  }
}
