import path from 'path'
import { writeFile } from 'fs/promises'
import { error } from 'console'
import { buffer } from 'stream/consumers'

import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Update Product
export const PUT = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]
  const formData = await req.formData()
  const name = formData.get('name')
  const categoryId = parseInt(formData.get('categoryId'))
  const image = formData.get('image')
  const description = formData.get('description')
  const price = parseFloat(formData.get('price'))
  console.log('ID from form data:', id)

  try {
    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    // Update the image if provided
    let imageName = existingProduct.image
    // if (image) {
    //   const buffer = Buffer.from(await image.arrayBuffer())
    //   imageName = name.replace(/\s/g, '_') // Replace all spaces with underscores
    //   const imageExt = image.name.split('.').pop()

    //   // Write the new image file
    //   await writeFile(`${process.cwd()}/public/images/${imageName}.${imageExt}`, buffer)
    // }

    // Update other fields
    await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name,
        categoryId: categoryId,
        image: imageName, // Update image name if provided:
        description: description,
        price: price
      }
    })

    return NextResponse.json({
      Message: 'Product updated successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json(
      {
        Message: 'Failed to update Product. ' + error,
        status: 500
      },
      { status: 500 }
    )
  }
}

// Delete Product
export const DELETE = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the Product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    // Delete the category
    await prisma.product.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Product deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to delete Product.',
      status: 500
    })
  }
}

// Get Product by id
export const GET = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the Product exists
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    return NextResponse.json({
      product,
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to get Product.',
      status: 500
    })
  }
}
