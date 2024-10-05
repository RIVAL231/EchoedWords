import { NextResponse } from 'next/server'
import { addComment } from '../../../lib/db'

export async function POST(request) {
  try {
    const { id, comment } = await request.json()
    await addComment(id, comment)
    return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json({ message: 'Failed to add comment' }, { status: 500 })
  }
}