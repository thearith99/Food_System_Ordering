import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false
  }
};

// Get all users
export const GET = async (request) => {
  try {
    const users = await prisma.user.findMany();


return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);

return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};

// Create a new user
export const POST = async (request) => {
  try {
    const body = await request.json(); // Manually parse the request body

    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    return NextResponse.json({ data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);

return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
};


