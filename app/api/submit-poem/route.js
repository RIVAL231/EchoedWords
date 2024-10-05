// app/api/submit-poem/route.js
import { NextResponse } from 'next/server';
import { addPendingPoem } from '../../../lib/db';

export async function POST(request) {
  try {
    const poem = await request.json();
    await addPendingPoem(poem);
    return NextResponse.json({ message: 'Poem submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting poem:', error);
    return NextResponse.json({ message: 'Failed to submit poem' }, { status: 500 });
  }
}
