import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Update Product
export const PUT = async req => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]
  const formData = await req.formData()
  const productId = parseInt(formData.get('productId'))
  const discountId = parseInt(formData.get('discountId'))
  try {
    // Check if the product discount exists
    const existingProductDiscount = await prisma.ProductDiscount.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProductDiscount) {
      return NextResponse.json({ error: 'Product Discount not found.' }, { status: 404 })
    }

    // Update other fields
    await prisma.ProductDiscount.update({
      where: { id: Number(id) },
      data: {
        productId: productId,
        discountId: discountId
      }
    })

    return NextResponse.json({
      Message: 'Product Discount updated successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to update Product Discount.',
      status: 500
    })
  }
}

// Delete Product
export const DELETE = async req => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the product discount exists
    const existingProductDiscount = await prisma.ProductDiscount.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProductDiscount) {
      return NextResponse.json({ error: 'Product Discount not found.' }, { status: 404 })
    }

    // Delete the product discount
    await prisma.ProductDiscount.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Product Discount deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to delete Product Discount.',
      status: 500
    })
  }
}

// Get Product Discount by id
export const GET = async req => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the product discount exists
    const ProductDiscount = await prisma.ProductDiscount.findUnique({
      where: { id: Number(id) }
    })

    if (!ProductDiscount) {
      return NextResponse.json({ error: 'Product Discount not found.' }, { status: 404 })
    }

    return NextResponse.json({
      ProductDiscount,
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to get Product Discount.',
      status: 500
    })
  }
}
