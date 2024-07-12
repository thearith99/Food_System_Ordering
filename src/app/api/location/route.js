import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async request => {
  try {
    const locations = await prisma.location.findMany()

    // Modify the mapping to include location's markname
    const response = locations.map(location => ({
      ...location
    }))

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch locations'))
  }
}