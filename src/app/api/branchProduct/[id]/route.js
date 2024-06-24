import path from 'path'
import { writeFile } from 'fs/promises'
import { error } from 'console'
import { buffer } from 'stream/consumers'

import { request } from 'http'

import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Update Product
export const PUT = async req => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]
  const formData = await req.formData()
  const productId = parseInt(formData.get('productId'))
  const branchId = parseInt(formData.get('branchId'))
  const status = formData.get('status')
  const price = parseFloat(formData.get('price'))
  console.log('ID from form data:', id)

  try {
    // Check if the category exists
    const existingProduct = await prisma.branchProduct.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProduct) {
      return existingProduct.json({ error: 'Branch Product not found.' }, { status: 404 })
    }

    // Update other fields
    await prisma.branchProduct.update({
      where: { id: Number(id) },
      data: {
        productId: productId,
        branchId: branchId,
        status: status,
        price: price
      }
    })

    return NextResponse.json({
      Message: 'Branch Product updated successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to update Branch.',
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
    const existingBranchProduct = await prisma.branchProduct.findUnique({
      where: { id: Number(id) }
    })

    if (!existingBranchProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    // Delete the category
    await prisma.branchProduct.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Branch deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to delete Branch.',
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
    const branchProduct = await prisma.branchProduct.findUnique({
      where: { id: Number(id) }
    })

    if (!branchProduct) {
      return NextResponse.json({ error: 'Branch not found.' }, { status: 404 })
    }

    return NextResponse.json({
      branchProduct,
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to get Branch.',
      status: 500
    })
  }
}
