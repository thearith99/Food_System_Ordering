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
    const formData = await req.formData()
    const markName = formData.get('markName')
    const lat = parseFloat(formData.get('lat'))
    const long = parseFloat(formData.get('long'))

    // Check if the location already exists
    const existingLocation = await prisma.location.findFirst({
      where: {
        markName,
        lat,
        long
      }
    })

    if (existingLocation) {
      return NextResponse.json({ Message: 'Location already exists', status: 400 })
    }

    // Create new location
    await prisma.location.create({
      data: {
        markName,
        lat,
        long
      }
    })

    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error occurred:', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
