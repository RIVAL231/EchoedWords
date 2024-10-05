import { NextResponse } from 'next/server'
import { likePoem } from '../../../lib/db'

export async function POST(request) {
  try {
    const { id } = await request.json()
    await likePoem(id)
    return NextResponse.json({ message: 'Poem liked successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error liking poem:', error)
    return NextResponse.json({ message: 'Failed to like poem' }, { status: 500 })
  }
}