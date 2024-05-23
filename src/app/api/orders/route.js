import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb' // Increase size limit if necessary
    }
  }
}

export const POST = async (req, res) => {
  try {
    const { cart, totalAmount } = JSON.parse(req.body)

    // Save the order and order details to the database
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(), // You need to implement this function to generate order numbers
        locationId: 1, // Example location ID, you may need to adjust this based on your setup
        status: 'pending', // Initial status of the order
        userId: 1, // Example user ID, you may need to adjust this based on your authentication system
        orderDetails: {
          createMany: {
            data: cart.map(item => ({
              productId: item.id,
              totalAmount: totalAmount,
              qty: item.quantity
            }))
          }
        }
      }
    })

    return NextResponse.json({ order, Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
function generateOrderNumber() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
}
