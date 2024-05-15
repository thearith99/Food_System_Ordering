import { NextResponse } from 'next/server'

// Data Imports
import { db } from '@/app/api/fake-db/apps/product'

export async function GET() {
  return NextResponse.json(db)
}
