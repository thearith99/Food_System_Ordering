import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async request => {
  try {
    const data = await request.json()
    const { name, image, parentId } = data
    const category = await prisma.category.create({
      data: {
        name,
        image,
        status: true,
        parentId
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.error(new Error('Failed to create category'))
  }
}

export const GET = async request => {
  try {
    const categories = await prisma.category.findMany()
    const response = categories.map(category => ({
      ...category,
      status: true // Set the status to true for each category
    }))
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch categories'))
  }
}
