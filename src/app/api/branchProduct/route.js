import path from 'path'
import { writeFile } from 'fs/promises'
import { error } from 'console'
import { buffer } from 'stream/consumers'

import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false
  }
}

export const POST = async (req, res) => {
  try {
    const formData = await req.formData()
    const productId = parseInt(formData.get('productId'))
    const branchId = parseInt(formData.get('branchId'))
    const status = formData.get('status')
    const price = parseFloat(formData.get('price'))

    // Check if the product already exists in the branch
    const existingbranchProduct = await prisma.branchProduct.findFirst({
      where: {
        productId: productId,
        branchId: branchId
      }
    })

    if (existingbranchProduct) {
      // If the product already exists, return a conflict response
      return NextResponse.json({ message: 'Product already exists in this branch', status: 409 })
    }

    // If the product does not exist, create a new entry
    await prisma.branchProduct.create({
      data: {
        productId: productId,
        branchId: branchId,
        status: status,
        price: price
      }
    })

    return NextResponse.json({ message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occurred', error)

return NextResponse.json({ message: 'Failed', status: 500 })
  }
}

export const GET = async request => {
  try {
    const products = await prisma.branchProduct.findMany({
      include: {
        product: true,
        branch: true
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
