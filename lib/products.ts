"use server";

import { z } from "zod";
import { getCurrentUser } from "./auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .coerce
    .number()
    .nonnegative("Price must be non-negative"),
  quantity: z
    .coerce
    .number()
    .int()
    .min(0, "Quantity must be Non-negative"),
  sku: z.string().optional(),
  lowStackAt: z.coerce.number().int().min(0).optional(),
});

// Called from <form action={deleteProduct}> with a hidden `id` field
export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Product id is required");
  }

  await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });

  redirect("/inventory");
}

// Called from <form action={createProduct}> with fields name, price, etc.
export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStackAt: formData.get("lowStackAt") || undefined,
  });

  if (!parsed.success) {
    // In a real app you might return a structured error instead
    throw new Error("Validation failed");
  }

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        userId: user.id,
      },
    });
  } catch (error: any) {
    console.error("Prisma Error:", error);
    throw error;
  }

  redirect("/inventory");
}
