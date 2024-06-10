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
  const amount = parseFloat(formData.get('amount'))
  const branchId = parseInt(formData.get('branchId'))

  try {
    await prisma.discount.create({
      data: {
        amount: amount,
        branchId: branchId
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
    const discounts = await prisma.discount.findMany({})

    const response = discounts.map(discount => ({
      ...discount
    }))

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch Discount'))
  }
}
