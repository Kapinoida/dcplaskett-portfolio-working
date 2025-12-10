import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Test API Route Hit');
  return NextResponse.json({ message: 'API Works' });
}
