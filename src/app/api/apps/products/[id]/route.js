import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const GET_BY_ID = async (request, { params }) => {
  const productId = params.id

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      const errorResponse = new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404
      })
      errorResponse.headers.set('Content-Type', 'application/json')
      return errorResponse
    }

    const successResponse = new Response(JSON.stringify(product), {
      status: 200
    })
    successResponse.headers.set('Content-Type', 'application/json')
    return successResponse
  } catch (error) {
    console.error('Failed to fetch product:', error)
    const errorResponse = new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500
    })
    errorResponse.headers.set('Content-Type', 'application/json')
    return errorResponse
  }
}

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json()
    const { name, price, description, image, productId } = data
    const id = parseInt(params.id)
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        image,
        status: true,
        productId
      }
    })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.error(new Error('Failed to update product'))
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const id = parseInt(params.id)
    const deletedProduct = await prisma.product.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'product deleted successfully' })
  } catch (error) {
    return NextResponse.error(new Error('Failed to delete product'))
  }
}
