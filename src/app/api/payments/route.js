
import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get a payment

export const GET = async request => {
  try {
    const payments = await prisma.payment.findMany();

    return NextResponse.json({data: payments})
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch payments'))
  }
}

// Create a payment

export async function post(req, res) {
  try {
    const { orderId, type, amount } = JSON.parse(req.body);

    if (!orderId || !type || !amount) {
      return NextResponse.error({ message: 'Missing required fields' });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId,
        type,
        amount,
      },
    });

    return NextResponse.json({ data: payment });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
