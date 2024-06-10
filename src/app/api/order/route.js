import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async request => {
  try {
    const orders = await prisma.order.findMany()

    // Modify the mapping to include location's markname
    const response = orders.map(order => ({
      ...order
    }))

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch orders'))
  }
}
