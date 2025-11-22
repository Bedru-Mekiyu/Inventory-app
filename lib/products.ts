'use server'
import {z} from 'zod'

import { getCurrentUser } from "./auth";
import { prisma } from "./prisma";
import { redirect } from 'next/navigation';


const ProductSchema=z.object({
    name:z.string().min(1,'Name is required'),
    price:z.coerce.number().nonnegative("Price must be non-negative"),
    quantity:z.coerce.number().int().min(0,"Quantity must be Non-negative"),
    sku:z.string().optional(),
    lowStackAt:z.coerce.number().int().min(0).optional()
})

export async function deleteProduct(formData:FormData) {
    const user=await getCurrentUser()
    const id=String(formData.get('id')||'')
    await prisma.product.deleteMany({
        where:{id:id,userId:user.id}
    });
}
export async function createProduct(formData:FormData) {
    const user=await getCurrentUser()
    const parsed=ProductSchema.safeParse({
        name:formData.get("name"),
        price:formData.get('price'),
        quantity:formData.get('quantity'),
        sku:formData.get('sku')||undefined,
        lowStackAt:formData.get("lowStackAt")||undefined
    });
    if(!parsed.success){
        throw new Error("Validation failed")
    }
   try{
     await prisma.product.create({
        data: {...parsed.data,userId:user.id}
     });
   
   }catch(error){
    throw new Error("Failed to create product")
   }
}