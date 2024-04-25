import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        image: true,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category data' });
  } finally {
    await prisma.$disconnect();
  }
}
