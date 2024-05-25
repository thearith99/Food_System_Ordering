import path from 'path'
import { writeFile } from 'fs/promises'
import { error } from 'console'
import { buffer } from 'stream/consumers'

import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Update Category
export const PUT = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]
  const formData = await req.formData()
  const name = formData.get('name')
  const parentId = parseInt(formData.get('parentId'))
  const image = formData.get('image')

  console.log('ID from form data:', id)

  try {
    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) }
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
    }

    // Update the image if provided
    let imageName = existingCategory.image

    // if (image) {
    //   const buffer = Buffer.from(await image.arrayBuffer())

    //   // imageName = name.replaceAll("", "_");
    //   imageName = name.replace(/\s/g, '_') // Replace all spaces with underscores
    //   const imageExt = image.name.split('.').pop()

    //   // Write the new image file
    //   await writeFile(
    //     `${process.cwd()}/public/images/${imageName}.${imageExt}`,

    //     // `${process.cwd()}/public/images/${imageName}.jpg`,
    //     buffer
    //   )
    // }

    // Update other fields
    await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name: name,
        parentId: parentId,
        image: imageName // Update image name if provided
      }
    })

    return NextResponse.json({
      Message: 'Category updated successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to update category.',
      status: 500
    })
  }
}

// Delete Category
export const DELETE = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) }
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
    }

    // Delete the category
    await prisma.category.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Category deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to delete category.',
      status: 500
    })
  }
}

// Get Category by id
export const GET = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
    }

    return NextResponse.json({
      category,
      status: 200
    })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({
      Message: 'Failed to get category.',
      status: 500
    })
  }
}
