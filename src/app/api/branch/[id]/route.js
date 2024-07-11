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
  const name = formData.get('name')
  const locationId = parseInt(formData.get('locationId'))

  console.log('ID from form data:', id)

  try {
    // Check if the category exists
    const existingProductBranch = await prisma.branch.findUnique({
      where: { id: Number(id) }
    })

    if (!existingProductBranch) {
      return existingProductBranch.json({ error: 'Branch not found.' }, { status: 404 })
    }

    // Update other fields
    await prisma.branch.update({
      where: { id: Number(id) },
      data: {
        name: name,
        locationId: locationId
      }
    })

    return NextResponse.json({
      Message: 'Branch updated successfully.',
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
    // Check if the Branch exists
    const existingBranch = await prisma.branch.findUnique({
      where: { id: Number(id) }
    })

    if (!existingBranch) {
      return NextResponse.json({ error: 'Branch not found.' }, { status: 404 })
    }

    // Delete related BranchProduct entries
    await prisma.branchProduct.deleteMany({
      where: { branchId: Number(id) }
    })

    // Delete the branch
    await prisma.branch.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      Message: 'Branch deleted successfully.',
      status: 200
    })
  } catch (error) {
    console.error('Error occurred', error)

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        Message: 'Failed to delete Branch due to database constraint.',
        status: 500
      })
    } else {
      return NextResponse.json({
        Message: 'Failed to delete Branch.',
        status: 500
      })
    }
  }
}

// Get Branch by id
export const GET = async (req, res) => {
  const path = req.nextUrl.pathname.split('/')
  const id = path[path.length - 1]

  try {
    // Check if the Branch exists
    const branch = await prisma.branch.findUnique({
      where: { id: Number(id) }
    })

    if (!branch) {
      return NextResponse.json({ error: 'Branch not found.' }, { status: 404 })
    }

    return NextResponse.json({
      branch,
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
