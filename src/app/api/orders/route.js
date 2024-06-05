
import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get all order
export const GET = async request => {
  try {
    const orders = await prisma.order.findMany();

    return NextResponse.json({data: orders})
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch orders'))
  }
}

// Create an order

export async function post(req, res) {
  try {
    const { orderNumber, locationId, status, userId } = JSON.parse(req.body);

    if (!orderNumber || !locationId || !status || !userId) {
      return NextResponse.error({ message: 'Missing required fields' });
    }

    const order = await prisma.order.create({
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
