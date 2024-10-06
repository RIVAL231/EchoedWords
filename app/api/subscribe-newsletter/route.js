import { NextResponse } from 'next/server'
import { addNewsletterSubscriber } from '../../../lib/db'

export async function POST(request) {
  try {
    const { email } = await request.json()
    await addNewsletterSubscriber(email)
    return NextResponse.json({ message: 'Subscribed to newsletter successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json({ message: 'Failed to subscribe to newsletter' }, { status: 500 })
  }
}