import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false
  }
}

export const POST = async req => {
  try {
    const formData = await req.formData()
    const productId = parseInt(formData.get('productId'))
    const discountId = parseInt(formData.get('discountId'))

    // Check if the product already exists with the discount
    const existingProductDiscount = await prisma.productDiscount.findFirst({
      where: {
        productId: productId,
        discountId: discountId
      }
    })

    if (existingProductDiscount) {
      // If the product already exists, return a conflict response
      return NextResponse.json({ message: 'Product already exists with this discount', status: 409 })
    }

    // If the product does not exist, create a new entry
    await prisma.productDiscount.create({
      data: {
        productId: productId,
        discountId: discountId
      }
    })

    return NextResponse.json({ message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occurred', error)
    return NextResponse.json({ message: 'Failed', status: 500 })
  }
}

export const GET = async () => {
  try {
    const products = await prisma.productDiscount.findMany({
      include: {
        product: true,
        discount: true
      }
    })

    const response = products.map(product => ({
      ...product,
      img: product.product.image,
      product: product.product.name, // Adjust to fit the desired structure
      discount: product.discount.amount, // Adjust to fit the desired structure
      branchId: product.discount.branchId
    }))

    return NextResponse.json(response)
  } catch (error) {
    console.log('Error occurred', error)
    return NextResponse.json({ message: 'Failed to fetch products', error: error.message }, { status: 500 })
  }
}
