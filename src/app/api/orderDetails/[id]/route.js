import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};


// Update an existing order detail
export const PUT = async (request) => {
  try {
    const { body, query } = request;
    const { id } = query;

    const updatedOrderDetail = await prisma.orderDetail.update({
      where: { id: parseInt(id) },
      data: body
    });

    return NextResponse.json({ data: updatedOrderDetail });
  } catch (error) {
    return NextResponse.error(new Error('Failed to update order detail'));
  }
};

// Delete an existing order detail
export const DELETE = async (request) => {
  try {
    const { query } = request;
    const { id } = query;

    await prisma.orderDetail.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    return NextResponse.error(new Error('Failed to delete order detail'));
  }
};
