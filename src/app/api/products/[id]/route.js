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
  const formData = await req.json()
  const { id, name, price, description, image, categoryId, category } = formData

  console.log('from form data:', formData)

  try {
    // Check if the category exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProduct) {
      return existingProduct.json({ error: 'Product not found.' }, { status: 404 })
    }

    // Update the image if provided
    let imageName = existingProduct.image

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())

      // imageName = name.replaceAll("", "_");
      imageName = name.replace(/\s/g, '_') // Replace all spaces with underscores
      const imageExt = image.name.split('.').pop()

      // Write the new image file
      await writeFile(
        `${process.cwd()}/public/images/${imageName}.${imageExt}`,

        // `${process.cwd()}/public/images/${imageName}.jpg`,
        buffer
      )
    }

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

    return NextResponse.json({
      Message: 'Failed to update Product.',
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
