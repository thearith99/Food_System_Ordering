import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get all order details
export const GET = async request => {
  try {
    const orderDetails = await prisma.orderDetail.findMany();

    return NextResponse.json({ orderDetails });
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch order details'));
  }
}

// Create a new order detail
export const POST = async (request) => {
  try {
    const body = await request.json(); // Manually parse the request body

    const newOrderDetails = await Promise.all(
      body.map(async (orderDetail) => {
        return await prisma.orderDetail.create({
          data: orderDetail
        });
      })
    );

    return NextResponse.json({ data: newOrderDetails });
  } catch (error) {
    console.error('Error creating order detail:', error);

    return NextResponse.json({ error: 'Failed to create order detail' }, { status: 500 });
  }
};
