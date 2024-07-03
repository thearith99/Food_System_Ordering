import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false
  }
}

// Update an order
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const body = await req.json()
    const { orderNumber, locationId, status, userId } = body

    if (!orderNumber || !locationId || !status || !userId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const updatedAt = new Date() // Set updatedAt to current date and time

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        orderNumber,
        locationId,
        status,
        userId,
        updatedAt
      }
    })

    return NextResponse.json({ data: updatedOrder }, { status: 200 })
  } catch (error) {
    console.error('Error updating order:', error)

    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// Delete an order
export async function DELETE(req, { params }) {
  try {
    const { id } = params

    await prisma.order.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting order:', error)

    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
