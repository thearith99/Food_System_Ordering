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
  const formData = await req.formData()
  const image = formData.get('image')
  const name = formData.get('name')
  const parentId = parseInt(formData.get('parentId'))

  if (!image) {
    return NextResponse.json({ error: 'No image received.' }, { status: 400 })
  }

  const buffer = Buffer.from(await image.arrayBuffer())
  const imageName = name.replaceAll('', '_')
  const imageExt = image.name.split('.').pop()

  try {
    await writeFile(path.join(process.cwd(), `public/images/${imageName}.${imageExt}`), buffer)

    // Save the data to the database
    await prisma.category.create({
      data: {
        name: name,
        parentId: parentId,
        image: imageName
      }
    })

    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occurred', error)

    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}

export const GET = async request => {
  try {
    const categories = await prisma.category.findMany()

    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch categories'))
  }
}
