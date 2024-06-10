import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async request => {
  try {
    const locations = await prisma.location.findMany()

    // Modify the mapping to include location's markname
    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch locations'))
  }
}
