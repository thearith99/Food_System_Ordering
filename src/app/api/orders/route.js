import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Get all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    

return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);

return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// Create an order
export async function POST(req) {
  try {
    const body = await req.json();
    const { orderNumber, locationId, status, userId } = body;

    if (!orderNumber || !locationId || !status || !userId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const createdAt = new Date();
    const updatedAt = new Date(); // Set updatedAt to current date and time

    const order = await prisma.order.create({
      data: {
        orderNumber,
        locationId,
        status,
        userId,
        createdAt,
        updatedAt,
      },
    });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);

return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
