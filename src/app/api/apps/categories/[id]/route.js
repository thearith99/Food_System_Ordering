import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


// export const GET_BY_ID = async (request) => {
//     try {
//         const categoryId = request.params.id;
//         const category = await prisma.category.findUnique({
//             where: {
//                 id: parseInt(categoryId)
//             }
//         });
//         if (!category) {
//             return NextResponse.error(new Error('Category not found'), { status: 404 });
//         }
//         return NextResponse.json(category);
//     } catch (error) {
//         return NextResponse.error(new Error('Failed to fetch category'));
//     }
// }

export const PUT = async (request, {params}) => {
    try {
        const data = await request.json();
        const {name,image,parentId} = data;
        const id = parseInt(params.id);
        const updatedCategory = await prisma.category.update({
            where: {id},
            data: {
                name,
                image,
                parentId
            }
        });
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.error(new Error('Failed to update category'));
    }
}

export const DELETE = async (request, {params}) => {
    try {
        const id = parseInt(params.id);
        const deletedCategory = await prisma.category.delete({
            where:{id}
        });
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.error(new Error('Failed to delete category'));
    }
}
