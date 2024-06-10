

import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get a payment by id

export async function Get(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return NextResponse.error({ message: 'Missing required field: id' });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!payment) {
      return NextResponse.error({ message: 'Payment not found' });
    }

    return NextResponse.json({ data: payment });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}

// Update a payment
export async function PUT(req, res) {
  try {
    const { id, orderId, type, amount } = JSON.parse(req.body);

    if (!id || !orderId || !type || !amount) {
      return NextResponse.error({ message: 'Missing required fields' });
    }

    const payment = await prisma.payment.update({
      where: { id },
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

// Delete a payment
export async function DELETE(req, res) {
  try {
    const { id } = JSON.parse(req.body);

    if (!id) {
      return NextResponse.error({ message: 'Missing required field: id' });
    }

    await prisma.payment.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
