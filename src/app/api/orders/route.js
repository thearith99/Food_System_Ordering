<<<<<<< HEAD

import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
=======
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
>>>>>>> origin/master

export const config = {
  api: {
    bodyParser: false
  }
<<<<<<< HEAD
};
=======
}
>>>>>>> origin/master

// Get all order
export const GET = async request => {
  try {
<<<<<<< HEAD
    const orders = await prisma.order.findMany();

    return NextResponse.json({data: orders})
=======
    const orders = await prisma.order.findMany()

    return NextResponse.json(orders)
>>>>>>> origin/master
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch orders'))
  }
}

// Create an order

<<<<<<< HEAD
export async function post(req, res) {
  try {
    const { orderNumber, locationId, status, userId } = JSON.parse(req.body);

    if (!orderNumber || !locationId || !status || !userId) {
      return NextResponse.error({ message: 'Missing required fields' });
=======
export async function POST(req, res) {
  try {
    const { orderNumber, locationId, status, userId } = JSON.parse(req.body)

    if (!orderNumber || !locationId || !status || !userId) {
      return NextResponse.error({ message: 'Missing required fields' })
>>>>>>> origin/master
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        locationId,
        status,
<<<<<<< HEAD
        userId,
      },
    });

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.error({ message: error.message });
=======
        userId
      }
    })

    return NextResponse.json({ data: order })
  } catch (error) {
    return NextResponse.error({ message: error.message })
>>>>>>> origin/master
  }
}
