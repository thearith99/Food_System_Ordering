import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get an order by id

export async function Get(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return NextResponse.error({ message: 'Missing required field: id' });
    }

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!order) {
      return NextResponse.error({ message: 'Order not found' });
    }

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}


// Update an order
export async function PUT(req, res) {
  try {
    const { id, orderNumber, locationId, status, userId } = JSON.parse(req.body);

    if (!id || !orderNumber || !locationId || !status || !userId) {
      return NextResponse.error({ message: 'Missing required fields' });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        orderNumber,
        locationId,
        status,
        userId,
      },
    });

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}

// Delete an order
export async function DELETE(req, res) {
  try {
    const { id } = JSON.parse(req.body);

    if (!id) {
      return NextResponse.error({ message: 'Missing required field: id' });
    }

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
