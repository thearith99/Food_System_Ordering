import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
  }

  const { markName, lat, long } = await req.json();

  try {
    const updatedLocation = await prisma.location.update({
      where: { id: parseInt(id) },
      data: {
        markName,
        lat,
        long,
      },
    });

    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (error) {
    console.error('Error updating location:', error);

return NextResponse.json({ message: 'Failed to update location' }, { status: 500 });
  }
}

// Delete a location
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Debugging step: log the id to ensure it's being passed correctly
    // console.log('Deleting location with ID:', id);

    if (!id) {
      return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
    }

    await prisma.location.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Location deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting location:', error);

return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
