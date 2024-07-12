import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Update Product
export const PUT = async req => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]
  const formData = await req.formData()
  const amount = parseFloat(formData.get('amount'))
  const branchId = parseInt(formData.get('branchId'))

  try {
    // Check if the category exists
    const existingDiscount = await prisma.discount.findUnique({
      where: { id: Number(id) }
    })

    if (!existingDiscount) {
      return existingDiscount.json({ error: 'Branch not found.' }, { status: 404 })
    }

    // Update other fields
    await prisma.discount.update({
      where: { id: Number(id) },
      data: {
        amount: amount,
        branchId: branchId
      }
    })

    return NextResponse.json({
      Message: 'Discount updated successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to update Discount.',
      status: 500
    })
  }
}

// Delete Product
export const DELETE = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the Product exists
    const existingDiscount = await prisma.discount.findUnique({
      where: { id: Number(id) }
    })

    if (!existingDiscount) {
      return NextResponse.json({ error: 'Discount not found.' }, { status: 404 })
    }
    // Delete related BranchProduct entries
    await prisma.productDiscount.deleteMany({
      where: { discountId: Number(id) }
    })
    // Delete the category
    await prisma.discount.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Discount deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to delete Discount.',
      status: 500
    })
  }
}

// Get Branch by id
export const GET = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the Branch exists
    const discount = await prisma.discount.findUnique({
      where: { id: Number(id) }
    })

    if (!discount) {
      return NextResponse.json({ error: 'Discount not found.' }, { status: 404 })
    }

    return NextResponse.json({
      discount,
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to get Discount.',
      status: 500
    })
  }
}
