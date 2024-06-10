import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Update a user
export const PUT = async (request) => {
  try {
    // console.log("Request:", request); // Log the request object
    // console.log("Query parameters:", request.query); // Log the query parameters
    const id = request.query.id; // Extract id from the URL query

    if (!id) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    const body = await request.json(); // Manually parse the request body

    const { name, email, phone, password } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
};

// Delete a user
export const DELETE = async (request) => {
  try {
    const id = request.query.id; // Extract id from the URL query

    if (!id) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);

    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
};
