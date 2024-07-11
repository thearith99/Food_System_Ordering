import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false
  }
}

// Get all locations
export async function GET() {
  try {
    const locations = await prisma.location.findMany()


return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}

// Create a location
export async function POST(req) {
  try {
    const body = await req.json()
    const { markName, lat, long } = body

    if (!markName || !lat || !long) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Parse lat and long as floats
    const parsedLat = parseFloat(lat);
    const parsedLong = parseFloat(long);

    const location = await prisma.location.create({
      data: {
        markName,
        lat,
        long
      }
    })

    return NextResponse.json({ data: location }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
