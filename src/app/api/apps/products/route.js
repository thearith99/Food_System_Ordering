import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async request => {
  try {
    const data = await request.json()
    const { name, price, description, image, status, categoryId } = data

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
        status,
        categoryId
      }
    })

    return NextResponse.json(newProduct)
  } catch (error) {
    return NextResponse.error(new Error('Failed to create product'))
  }
}
export const GET = async request => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    })
    const response = products.map(product => ({
      ...product
    }))
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch products'))
  }
}
